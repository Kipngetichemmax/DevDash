const statsService = require('../services/statsService');

module.exports = () => {
    try {
        const stats = statsService.getDashboardStats();

        console.log("📊 DASHBOARD STATS");
        console.log("---------------");

        console.log("\n📝 Tasks:");
        console.log(stats.tasks);

        console.log("\n📚 Study by Subject:");
        console.log(stats.studyBySubject);

        console.log("\n⏱ Weekly Study:");
        console.log(stats.weeklyStudy);

        console.log("\n💪 Workouts:");
        console.log(stats.workouts);

    } catch (error) {
        console.log("Error:", error.message);
    }
};
