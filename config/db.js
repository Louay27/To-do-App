const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const connectDB = async () => {
    try {
    console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging line
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB Atlas Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1); // Exit process only if connection fails
  }
};

module.exports = connectDB;