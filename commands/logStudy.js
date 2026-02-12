const studyService = require('../services/studyService');

module.exports = (args) => {
    try {
        const subject = args[0];
        const hours = parseFloat(args[1]);

        if (!subject || isNaN(hours)) {
            console.log("❌ Usage: log-study <subject> <hours>");
            return;
        }

        const log = studyService.logStudy({
            subject,
            duration_hours: hours
        });

        console.log("📚 Study Logged:");
        console.log(log);

    } catch (error) {
        console.log("Error:", error.message);
    }
};
