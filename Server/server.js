import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

connectDB();

// Root endpoint
app.get("/", (req, res) => {
  res.send("<h1>Hello,</h1><p>Server is running.</p>");
});

// Start server
app.listen(PORT, (err) => {
  if (!err) {
    console.log(` Server started on http://localhost:${PORT}`);
  } else {
    console.error(" Error:", err);
  }
});
