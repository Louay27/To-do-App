const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
        type:String,
        required: true }, // Title is required

    description: {
        type: String }, // Additional details

    completed: {
        type: Boolean,
        default: false }, // Default value is false (not completed) 

    reminder: {
        type: Date }, // Reminder date

    recurring: { 
        type: String, enum: ["daily", "weekly", "monthly", "none"], default: "none" }, // Recurring reminders

    category: {
        type: String, enum: ["Work", "Personal", "Health", "Shopping", "Other"], default: "Other" }, // Categories

  }, 
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;