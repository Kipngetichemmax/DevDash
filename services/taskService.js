const db = require('../config/db');

class TaskService {

    createTask({ title, description = null, priority = 'medium' }) {
        if (!title) {
            throw new Error("Title is required.");
        }

        const stmt = db.prepare(`
            INSERT INTO tasks (title, description, priority)
            VALUES (?, ?, ?)
        `);

        const result = stmt.run(title, description, priority);

        return this.getTaskById(result.lastInsertRowid);
    }

    getTaskById(id) {
        return db.prepare(`
            SELECT * FROM tasks WHERE id = ?
        `).get(id);
    }

    getAllTasks(status = null) {
        if (status) {
            return db.prepare(`
                SELECT * FROM tasks WHERE status = ?
                ORDER BY created_at DESC
            `).all(status);
        }

        return db.prepare(`
            SELECT * FROM tasks
            ORDER BY created_at DESC
        `).all();
    }

    updateTaskStatus(id, status) {
        const stmt = db.prepare(`
            UPDATE tasks
            SET status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `);

        stmt.run(status, id);

        return this.getTaskById(id);
    }

    deleteTask(id) {
        return db.prepare(`
            DELETE FROM tasks WHERE id = ?
        `).run(id);
    }
}

module.exports = new TaskService();
