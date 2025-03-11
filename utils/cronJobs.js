const cron = require("node-cron");
const Todo = require("../models/Todo");

// Schedule task to run every midnight

// MANUALLY TEST REMIDNERS ----------------------------
/*const updateRecurringReminders = async () => {
    console.log("🔄 Running recurring reminder check...");*/
// MANUALLY TEST REMIDNERS ----------------------------

// MANUALLY RUN REMIDNERS ----------------------------
cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Running recurring reminder check...");
// MANUALLY RUN REMIDNERS ----------------------------

  try {
    const now = new Date();

    // Find all todos that have reminders and are recurring
    const todos = await Todo.find({
      reminder: { $lte: now }, // Reminder date is in the past
      recurring: { $in: ["daily", "weekly", "monthly"] }, // Only recurring ones
    });

    for (let todo of todos) {
      let newReminder = new Date(todo.reminder);

      if (todo.recurring === "daily") {
        newReminder.setDate(newReminder.getDate() + 1);
      } else if (todo.recurring === "weekly") {
        newReminder.setDate(newReminder.getDate() + 7);
      } else if (todo.recurring === "monthly") {
        newReminder.setMonth(newReminder.getMonth() + 1);
      }

      // Update the reminder date
      await Todo.findByIdAndUpdate(todo._id, { reminder: newReminder });
      console.log(`🔔 Updated reminder for: ${todo.title} → Next: ${newReminder}`);
    }

    console.log("✅ Recurring reminders processed.");
  } catch (error) {
    console.error("🔥 Error processing reminders:", error);
  }
});

// MANUALLY TEST REMIDNERS ----------------------------
// ⏰ Schedule the function to run automatically every day at midnight
/*cron.schedule("0 0 * * *", updateRecurringReminders);*/

// 🔄 Export the function so we can trigger it manually
/*module.exports = updateRecurringReminders;*/
// MANUALLY TEST REMIDNERS ----------------------------