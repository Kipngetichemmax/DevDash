const taskService = require('./taskService');
const goalService = require('./goalService');
const studyService = require('./studyService');
const workoutService = require('./workoutService');

class StatsService {

getDashboardStats() {
    return {
        tasks: taskService.getAllTasks(),
        studyBySubject: studyService.getTotalBySubject(),
        weeklyStudy: studyService.getWeeklyTotal(),
        studyStreak: studyService.getStudyStreak(),
        workouts: workoutService.getWorkoutStats(),
        goals: goalService.getAllGoals()
    };
 }

}

module.exports = new StatsService();
