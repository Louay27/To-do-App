const express = require("express");
const Todo = require("../models/Todo"); // Import the Todo model

const router = express.Router();

// Create a New To-Do
router.post("/todos", async (req, res) => {
    try {
      const { title } = req.body; // Get 'title' from the request body
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }
  
      const newTodo = new Todo({ title }); // Create a new to-do item
      await newTodo.save(); // Save it to the database
      res.status(201).json(newTodo); // Return the saved item
    } catch (error) {
      console.error("🔥 Error creating To-Do:", error); // 🔴 This will print the exact error
      res.status(500).json({ message: "Error creating to-do", error });
    }
  });

// Get All To-Dos
  router.get("/todos", async (req, res) => {
    try {
      const todos = await Todo.find(); // Retrieve all to-dos from MongoDB
      res.status(200).json(todos); // Send them back as JSON response
    } catch (error) {
      console.error("🔥 Error fetching To-Dos:", error);
      res.status(500).json({ message: "Error fetching to-dos", error });
    }
  });

//Update a To-Do
router.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params; // Get ID from URL
      const { title, completed } = req.body; // Get new title or completed status
  
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { title, completed },
        { new: true } // Returns the updated object
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ message: "To-Do not found" });
      }
  
      res.status(200).json(updatedTodo);
    } catch (error) {
      console.error("🔥 Error fetching To-Dos:", error);
      res.status(500).json({ message: "Error updating to-do", error });
    }
  });

//Delete a To-Do
router.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params; // Get ID from URL
      const deletedTodo = await Todo.findByIdAndDelete(id);
  
      if (!deletedTodo) {
        return res.status(404).json({ message: "To-Do not found" });
      }
  
      res.status(200).json({ message: "To-Do deleted successfully" });
    } catch (error) {
      console.error("🔥 Error fetching To-Dos:", error);
      res.status(500).json({ message: "Error deleting to-do", error });
    }
  });

// Export the router correctly
module.exports = router;
