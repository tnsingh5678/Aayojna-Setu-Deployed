import express from "express";
import { dbConnection } from "./database/dbconnection.js";
// import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import schemeRoutes from "./routes/schemeRoutes.js"
import customRoutes from "./routes/custom.js"
// import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import http from 'http';  // To create HTTP server
//import { WebSocketServer } from 'ws';
import { Server } from "socket.io";



const app = express();
config({ path: "./.env" }); 

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL], // Allow connections from frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // You can listen to specific events from clients if needed
  socket.on('category-notification', (data) => {
    
    console.log('Message from client:', data);
  });


  
});






app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use('/api/v1/schemes', schemeRoutes);
app.use("/custom",customRoutes)

// app.use("/api/v1/job", jobRouter);
// app.use("/api/v1/application", applicationRouter);
dbConnection();

app.use(errorMiddleware);
server.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
export {app,io};
