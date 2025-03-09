const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true, // Title is required
    },
    completed: {
        type: Boolean,
        default: false, // Default value is false (not completed)
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;