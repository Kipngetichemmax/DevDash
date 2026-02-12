const taskService = require('../services/taskService');

module.exports = () => {
    try {
        const tasks = taskService.getAllTasks();

        console.log("📝 All Tasks:");
        console.log(tasks);

    } catch (error) {
        console.log("Error:", error.message);
    }
};
