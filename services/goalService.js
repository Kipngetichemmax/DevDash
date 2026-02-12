const db = require('../config/db');

class GoalService {

    createGoal({ name, target, deadline = null }) {
        if (!name || !target) {
            throw new Error("Goal name and target value required.");
        }

        const stmt = db.prepare(`
            INSERT INTO goals (name, target, deadline)
            VALUES (?, ?, ?)
        `);

        const result = stmt.run(name, target, deadline);

        return db.prepare(`
            SELECT * FROM goals WHERE id = ?
        `).get(result.lastInsertRowid);
    }

    updateProgress(id, increment) {
        db.prepare(`
            UPDATE goals
            SET current = current + ?
            WHERE id = ?
        `).run(increment, id);

        return db.prepare(`
            SELECT * FROM goals WHERE id = ?
        `).get(id);
    }

    getAllGoals() {
        return db.prepare(`
            SELECT *,
            CASE 
                WHEN target > 0 THEN (current * 100.0 / target) 
                ELSE 0 
            END as progress_percent
            FROM goals
        `).all();
    }
}

module.exports = new GoalService();

