const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes"); // Import routes

const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
connectDB();

// Use To-Do routes
app.use("/api", todoRoutes); 

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the To-Do API!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log("Request Body:", req.body);
  next();
});

