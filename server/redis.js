import Redis from 'ioredis';

// Initialize Redis client (one for general use and one for Pub/Sub)
// Using lazyConnect to defer connection until the first interaction
const redisClient = new Redis({
    host: '127.0.0.1',  // Redis host
    port: 6379,         // Redis port
    lazyConnect: true,  // Defers the connection until the first interaction
});

const redisPubSubClient = new Redis({
    host: '127.0.0.1',  // Redis host for Pub/Sub
    port: 6379,         // Redis port
    lazyConnect: true,  // Defers the connection until the first interaction
});

redisClient.on('connect', () => {
    console.log('Connected to Redis (general client)');
});

redisPubSubClient.on('connect', () => {
    console.log('Connected to Redis (Pub/Sub client)');
});

export { redisClient, redisPubSubClient };
