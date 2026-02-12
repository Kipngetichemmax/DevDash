const taskService = require('./services/taskService');
const studyService = require('./services/studyService');
const workoutService = require('./services/workoutService');
const statsService = require('./services/statsService');
require('./config/db');

const command = process.argv[2];
const args = process.argv.slice(3);

// ANSI Escape Codes for Colors (Fixes Chalk TypeErrors)
const cyan = "\x1b[36m", yellow = "\x1b[33m", green = "\x1b[32m", 
      gray = "\x1b[90m", magenta = "\x1b[35m", reset = "\x1b[0m";

switch (command) {
    case "add-task":
        require('./commands/addTask')(args);
        break;

    case "log-study":
        require('./commands/logStudy')(args);
        break;

    case "log-workout":
        require('./commands/logWorkout')(args);
        break;

    case "tasks":
        require('./commands/listTasks')();
        break;

    case "add-goal":
        require('./commands/addGoal')(args);
        break;

    case "complete-task":
        require('./commands/completeTask')(args);
        break;


    case "stats":
        const Table = require("cli-table3");
        const stats = statsService.getDashboardStats();

        console.log(`${cyan}\n📊 DEV DASHBOARD SUMMARY${reset}`);
        console.log(`${gray}====================================${reset}`);

        // 1. TASKS SUMMARY (Fixed Truncation)
        const allTasks = stats.tasks || [];
        const total = allTasks.length;
        const pending = allTasks.filter(t => t.status === "pending").length;
        const done = allTasks.filter(t => t.status === "completed").length;
        console.log(`${yellow}📝 TASKS:${reset} Total: ${total} | ${yellow}Pending: ${pending}${reset} | ${green}Done: ${done}${reset}\n`);

        // 2. STUDY TABLE (Empty Array Fallback)
        const studyTable = new Table({
            head: [`${magenta}Subject${reset}`, `${magenta}Hours${reset}`],
            colWidths: [20, 10]
        });
        
        const studyMap = {};
        const studyData = stats.study || []; 
        studyData.forEach(s => studyMap[s.subject] = (studyMap[s.subject] || 0) + s.hours);
        Object.entries(studyMap).forEach(([sub, hr]) => studyTable.push([sub, hr + 'h']));

        console.log(`${magenta}📚 STUDY LOG${reset} (Streak: ${stats.studyStreak || 0} days)`);
        console.log(studyTable.toString());

        // 3. WORKOUT TABLE (Empty Array Fallback)
        const workoutTable = new Table({
            head: [`${cyan}Exercise${reset}`, `${cyan}Sessions${reset}`],
            colWidths: [20, 10]
        });

        const workoutMap = {};
        const workoutData = stats.workout || [];
        workoutData.forEach(w => workoutMap[w.exercise] = (workoutMap[w.exercise] || 0) + 1);
        Object.entries(workoutMap).forEach(([ex, count]) => workoutTable.push([ex, count]));

        console.log(`\n${cyan}💪 WORKOUT LOG${reset}`);
        console.log(workoutTable.toString());

        // 4. GOALS PROGRESS (Empty Array Fallback)
        const goalTable = new Table({
            head: [`${green}Goal${reset}`, `${green}Progress${reset}`, `${green}%${reset}`],
            colWidths: [20, 12, 8]
        });

        const goalsData = stats.goals || [];
        goalsData.forEach(g => {
            const pct = g.target > 0 ? Math.min(Math.round((g.current / g.target) * 100), 100) : 0;
            goalTable.push([g.name, `${g.current}/${g.target}`, `${pct}%`]);
        });

        console.log(`\n${green}🎯 GOALS${reset}`);
        console.log(goalTable.toString() + "\n");
        break;

    default:
        console.log(`${yellow}Available commands: add-task, log-study, log-workout, tasks, stats${reset}`);
}
	
