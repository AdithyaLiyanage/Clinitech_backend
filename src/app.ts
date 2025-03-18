import "dotenv/config";
import express from "express";
import cors from "cors";


const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());

// Simple route for the root URL
app.get("/", (req, res) => {
  res.send("Hello, World");
});

// Export the app

export default app;