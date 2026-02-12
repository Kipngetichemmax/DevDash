const workoutService = require('../services/workoutService');

module.exports = (args) => {
    try {
        const exercise = args[0];
        const reps = parseInt(args[1]);
        const sets = parseInt(args[2]);

        if (!exercise) {
            console.log("❌ Usage: log-workout <exercise> [reps] [sets]");
            return;
        }

        const log = workoutService.logWorkout({
            exercise,
            reps,
            sets
        });

        console.log("💪 Workout Logged:");
        console.log(log);

    } catch (error) {
        console.log("Error:", error.message);
    }
};
