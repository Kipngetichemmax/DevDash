const taskService = require('../services/taskService');

module.exports = (args) => {
    try {
        const title = args[0];

        if (!title) {
            console.log("❌ Please provide a task title.");
            return;
        }

        const task = taskService.createTask({ title });

        console.log("✅ Task Created:");
        console.log(task);

    } catch (error) {
        console.log("Error:", error.message);
    }
};
