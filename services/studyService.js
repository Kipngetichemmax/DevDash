const { calculateStreak } = require('../utils/dateUtils');
const db = require('../config/db');

class StudyService {

    logStudy({ subject, duration_hours, notes = null }) {
        if (!subject || !duration_hours || duration_hours <= 0) {
            throw new Error("Invalid study log.");
        }

        const stmt = db.prepare(`
            INSERT INTO study_logs (subject, duration_hours, notes)
            VALUES (?, ?, ?)
        `);

        const result = stmt.run(subject, duration_hours, notes);

        return db.prepare(`
            SELECT * FROM study_logs WHERE id = ?
        `).get(result.lastInsertRowid);
    }

    getTotalBySubject() {
        return db.prepare(`
            SELECT subject, SUM(duration_hours) as total_hours
            FROM study_logs
            GROUP BY subject
            ORDER BY total_hours DESC
        `).all();
    }
    getStudyStreak() {
    const rows = db.prepare(`
        SELECT DISTINCT date(date) as study_date
        FROM study_logs
        ORDER BY study_date DESC
    `).all();

    const dates = rows.map(r => r.study_date);

    return calculateStreak(dates);
}

    getWeeklyTotal() {
        return db.prepare(`
            SELECT SUM(duration_hours) as weekly_total
            FROM study_logs
            WHERE date >= datetime('now', '-7 days')
        `).get();
    }
}

module.exports = new StudyService();
