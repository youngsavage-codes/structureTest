import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from "./configs/connectDb";
import mongoose from "mongoose";
import rootRoute from "./route/root_route";

  const app = express();
  dotenv.config();
  connectDB();

  const port = process.env.PORT || 4000;
  // CORS Configuration
  const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];


  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, origin);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
  );

  app.options("*", cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser())

  app.use('/api/v1', rootRoute);

  mongoose.connection.on('connected', () => {
      app.listen(port, () => console.log(`Server connected on ${port}`))
      console.log('DB Connected');
  })





