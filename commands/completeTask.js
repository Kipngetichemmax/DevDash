const db = require('../config/db');

module.exports = (args) => {
    const id = args[0];

    if (!id) {
        console.log("\x1b[31mUsage: node index.js complete-task <task_id>\x1b[0m");
        return;
    }

    try {
        const stmt = db.prepare("UPDATE tasks SET status = 'completed' WHERE id = ?");
        const info = stmt.run(id);

        if (info.changes > 0) {
            console.log(`\x1b[32m✅ Task #${id} marked as completed!\x1b[0m`);
        } else {
            console.log(`\x1b[33m⚠️ Task #${id} not found.\x1b[0m`);
        }
    } catch (err) {
        console.error("\x1b[31mError completing task:\x1b[0m", err.message);
    }
};

