// routes/schemesRoutes.js
import express from 'express';
import Scheme from "../models/schemes.models.js"
import { redisClient,redisPubSubClient } from '../redis.js';
import Redis from 'ioredis';
import { io } from '../app.js';


const router = express.Router();

const redisPublisherClient = new Redis({
    host: 'localhost',
    port: 6379,
    // other config options as needed
  });

const redisSubscriberClient = new Redis({
    host: 'localhost',
    port: 6379,
    // other config options as needed
  });




// Utility function to create a cache key based on the search parameters
const createCacheKey = (categories) => {
    categories = categories || [];
    return `schemes:${categories.join(',')}`;
};

// Utility function to fetch data from Redis by key
const fetchDataFromRedis = async (cacheKey) => {
    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        } else {
            return null; // Return null if no data is cached
        }
    } catch (error) {
        console.error("Error fetching data from Redis:", error);
        throw new Error("Failed to fetch data from Redis");
    }
};


// Route to get all schemes (with caching)
router.get("/", async (req, res) => {
    const categories = req.query.categories ? req.query.categories.split(',') : [];

    // Create a unique cache key based on categories
    const cacheKey = createCacheKey(categories);

    try {
        // Check if the result is already cached in Redis
        const cachedSchemes = await redisClient.get(cacheKey);
        if (cachedSchemes) {
            console.log("Returning cached schemes.");
            return res.json(JSON.parse(cachedSchemes));
        }

        // Fetch schemes from the database
        let schemes = [];
        if (categories.length > 0) {
            schemes = await Scheme.find({ categories: { $in: categories } });
        } else {
            schemes = await Scheme.find();  // Get all schemes if no categories specified
        }

        // Cache the result in Redis for future requests
       // redisClient.setEx(cacheKey, 86400, JSON.stringify(schemes));  // Cache for 24 hours
        redisClient.setex(cacheKey, 86400, JSON.stringify(schemes))

        return res.json(schemes);
    } catch (error) {
        console.error("Error fetching schemes:", error);
        return res.status(500).json({ error: "Failed to retrieve schemes" });
    }
});

// Route to add a new scheme
router.post("/newscheme", async (req, res) => {
    const { schemeName, shortDescription, fullDescription, url, categories } = req.body;

    // Validate incoming request body
    if (!schemeName || !shortDescription || !fullDescription || !url) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Create a new scheme instance
        const newScheme = new Scheme({
            schemeName,
            shortDescription,
            fullDescription,
            url,
            categories,
        });

        // Save the scheme to the database
        const savedScheme = await newScheme.save();

        // Invalidate the cache (if any) since we've added a new scheme
        redisClient.del(createCacheKey(categories));  // Delete the cache for the relevant categories
        io.emit('new-scheme-notification', { type: 'new-scheme', data: newScheme });
        return res.status(201).json(savedScheme);
    } catch (error) {
        console.error("Error creating scheme:", error);
        return res.status(500).json({ error: "Failed to create scheme" });
    }
});




// Route to get schemes by category (with caching)
router.get("/category", async (req, res) => {
    const categories = req.query.categories ? req.query.categories.split(',') : [];

    if (categories.length === 0) {
        return res.status(400).json({ error: "Categories parameter is required" });
    }

    // Create a unique cache key based on categories
    const cacheKey = createCacheKey(categories);

    try {
        // Check if the result is already cached in Redis
        const cachedSchemes = await redisClient.get(cacheKey);
        if (cachedSchemes) {
            console.log("Returning cached schemes by category.");
            return res.json(JSON.parse(cachedSchemes));
        }

        // Fetch schemes from the database by category
        const schemes = await Scheme.find({ categories: { $in: categories } });

        // Cache the result in Redis for future requests
        redisClient.setex(cacheKey, 86400, JSON.stringify(schemes));  // Cache for 24 hours

        return res.json(schemes);
    } catch (error) {
        console.error("Error fetching schemes by category:", error);
        return res.status(500).json({ error: "Failed to retrieve schemes by category" });
    }
});

// Route to get schemes by ID (with caching)
router.get("/:id", async (req, res) => {
    const schemeId = req.params.id;

    try {
        // Check if the scheme is cached
        const cachedScheme = await redisClient.get(`scheme:${schemeId}`);
        if (cachedScheme) {
            console.log("Returning cached scheme.");
            return res.json(JSON.parse(cachedScheme));
        }

        // Fetch the scheme from the database
        const scheme = await Scheme.findById(schemeId);

        if (!scheme) {
            return res.status(404).json({ error: "Scheme not found" });
        }

        // Cache the scheme for future requests
        redisClient.setex(`scheme:${schemeId}`, 86400, JSON.stringify(scheme));  // Cache for 24 hours

        return res.json(scheme);
    } catch (error) {
        console.error("Error fetching scheme by ID:", error);
        return res.status(500).json({ error: "Failed to retrieve scheme by ID" });
    }
});


router.post("/send-notification", async (req, res) => {
    const { category, content ,read} = req.body;

    if (!category || !content) {
      return res.status(400).json({ error: "Category and content are required" });
    }
  
    try {
        // Broadcast the notification to all connected clients using Socket.IO
        io.emit('category-notification', { type: category, data: content ,read : read});
        const notificationId = `notification:${new Date().getTime()}`; // Use a unique ID based on the timestamp
        redisClient.setex(notificationId, 86400, JSON.stringify({ category, content ,read}));
        return res.status(200).json({ message: "Category-specific notification sent successfully" });
      } catch (error) {
        console.error("Error sending notification:", error);
        return res.status(500).json({ error: "Failed to send notification" });
    }
});

router.get("/fetch-notifications", async (req, res) => {
  try {
      const keys = await redisClient.keys('notification:*');
      
      if (keys.length === 0) {
          return res.status(404).json({ error: "No notifications found" });
      }

      const notifications = await Promise.all(keys.map(async (key) => {
          const notification = await redisClient.get(key);
          return JSON.parse(notification);
      }));

      res.status(200).json(notifications);
  } catch (error) {
      console.error("Error fetching notifications:", error);
      return res.status(500).json({ error: "Failed to fetch notifications" });
  }
});


redisSubscriberClient.subscribe('new-scheme', (err, count) => {
    if (err) {
      console.error("Failed to subscribe to channel:", err);
    } else {
      console.log(`Subscribed to ${count} channel(s). Listening for messages...`);
    }
  });
  
  redisSubscriberClient.on('message', (channel, message) => {
    if (channel === 'new-scheme') {
      const notification = JSON.parse(message); // assuming the message contains a notification object
      io.emit('category-notification', notification);
    }
  });
  
  // Send notification via Redis
  const sendNotification = (category, content) => {
    const message = {
      type: category,  // Category of the notification (e.g., 'student', 'health')
      data: content,   // Content of the notification (e.g., details about the scheme)
    };
  
    // Publish message to Redis, which will notify all connected clients
    redisPublisherClient.publish('new-scheme', JSON.stringify(message));
  };
  
  // Example route to trigger sending notification
  router.post('/send-notification', (req, res) => {
    const { category, content } = req.body;
  
    if (!category || !content) {
      return res.status(400).json({ error: 'Category and content are required' });
    }
  
    try {
      // Send notification using Redis and Socket.IO
      sendNotification(category, content);
      return res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
      console.error('Error sending notification:', error);
      return res.status(500).json({ error: 'Failed to send notification' });
    }
});

router.get("/customized-result", async (req, res) => {
    const categories = req.body;  // Expecting an array of categories
    const cacheKey = createCacheKey(categories);  // Generate cache key based on categories

    try {
        // Fetch schemes from Redis first
        const cachedResult = await redisClient.get(cacheKey);
        if (cachedResult) {
            console.log("Returning cached customized result.");
            return res.json(cachedResult); // If cached result exists, return it
        }

        // If no cache, fetch schemes from the database based on categories
        let schemes;
        if (categories.length > 0) {
            schemes = await Scheme.find({ categories: { $in: categories } });
        } else {
            schemes = await Scheme.find();  // Get all schemes if no categories specified
        }

        // Cache the result for future requests
        redisClient.setex(cacheKey, 86400, JSON.stringify(schemes));  // Cache for 24 hours

        return res.json(schemes);
    } catch (error) {
        console.error("Error fetching customized result:", error);
        return res.status(500).json({ error: "Failed to retrieve customized result" });
    }
});



  


export default router;
