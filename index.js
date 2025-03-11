const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes"); // Import routes
require("./utils/cronJobs");

// MANUALLY TEST REMIDNERS ----------------------------
/*const updateRecurringReminders = require("./utils/cronJobs");*/ // ✅ Import the function
// MANUALLY TEST REMIDNERS ----------------------------

const app = express();

// Connect to MongoDB Atlas
connectDB();

// MANUALLY TEST REMIDNERS ----------------------------
// ✅ Add an API endpoint to manually trigger recurring reminders
/*app.get("/api/test-recurring", async (req, res) => {
  try {
    await updateRecurringReminders(); // Call the function manually
    res.json({ message: "Recurring reminders updated!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating reminders", error });
  }
});*/
// MANUALLY TEST REMIDNERS ----------------------------

// Middleware
app.use(express.json());
app.use(cors());

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log("Request Body:", req.body);
  next();
});

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


