const db = require('../config/db');

class WorkoutService {

    logWorkout({ exercise, reps, sets }) {
        if (!exercise) {
            throw new Error("Exercise name required.");
        }

        const stmt = db.prepare(`
            INSERT INTO workout_logs (exercise, reps, sets)
            VALUES (?, ?, ?)
        `);

        const result = stmt.run(exercise, reps || null, sets || null);

        return db.prepare(`
            SELECT * FROM workout_logs WHERE id = ?
        `).get(result.lastInsertRowid);
    }

    getWorkoutStats() {
        return db.prepare(`
            SELECT exercise, COUNT(*) as sessions
            FROM workout_logs
            GROUP BY exercise
        `).all();
    }
}

module.exports = new WorkoutService();
