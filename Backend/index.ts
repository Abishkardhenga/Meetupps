import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import allroutes from './routes/routes';  // Import your routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

connectDB();

// Test route directly on app
app.get("/test", (req, res) => {
    res.status(200).json({ message: "Hello World" });
});

// Use your defined routes
app.use('/', allroutes);

// Start Server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
