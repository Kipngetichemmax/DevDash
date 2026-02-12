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

        // Style Helpers
        const c = { 
            cyan: "\x1b[36m", yellow: "\x1b[33m", green: "\x1b[32m", 
            red: "\x1b[31m", gray: "\x1b[90m", bold: "\x1b[1m", reset: "\x1b[0m" 
        };

        const createBar = (current, target) => {
            const size = 10;
            const progress = Math.min(Math.floor((current / target) * size), size);
            return `[${c.green}${"#".repeat(progress)}${c.gray}${"-".repeat(size - progress)}${c.reset}]`;
        };

        console.log(`\n${c.bold}${c.cyan}🚀 DEV DASHBOARD v2.0${c.reset}`);
        console.log(`${c.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);

        // 1. MINI-CARD SUMMARY
        const pending = (stats.tasks || []).filter(t => t.status === "pending").length;
        const streak = stats.studyStreak || 0;
        console.log(`${c.yellow}📝 Tasks:${c.reset} ${pending} Pending  |  ${c.cyan}📚 Streak:${c.reset} ${streak} Days  |  ${c.green}🎯 Goals:${c.reset} ${(stats.goals || []).length}\n`);

        // 2. DETAILED TASKS TABLE
        const taskTable = new Table({
            head: [c.gray+'ID'+c.reset, c.gray+'Status'+c.reset, c.gray+'Task Title'+c.reset],
            colWidths: [5, 12, 30],
            style: { head: [], border: [] }
        });

        (stats.tasks || []).slice(0, 5).forEach(t => {
            const statusLabel = t.status === 'completed' ? `${c.green}✔ DONE${c.reset}` : `${c.yellow}⏳ PENDING${c.reset}`;
            taskTable.push([t.id, statusLabel, t.title]);
        });
        console.log(`${c.bold}📋 RECENT TASKS${c.reset}`);
        console.log(taskTable.toString());

        // 3. GOALS WITH PROGRESS BARS
        const goalTable = new Table({
            head: [c.gray+'Goal'+c.reset, c.gray+'Progress'+c.reset, c.gray+'Bar'+c.reset, c.gray+'%'+c.reset],
            style: { head: [], border: [] }
        });

        (stats.goals || []).forEach(g => {
            const pct = g.target > 0 ? Math.round((g.current / g.target) * 100) : 0;
            const bar = createBar(g.current, g.target);
            goalTable.push([g.name, `${g.current}/${g.target}`, bar, `${pct}%`]);
        });

        console.log(`\n${c.bold}🎯 ACTIVE GOALS${c.reset}`);
        console.log(goalTable.toString());

        // 4. FOOTER SUMMARY
        const totalHours = (stats.study || []).reduce((acc, curr) => acc + (curr.hours || 0), 0);
        console.log(`\n${c.gray}📊 Total Study Investment: ${c.reset}${c.bold}${totalHours} Hours${c.reset}\n`);
        break;

    default:
        console.log(`${yellow}Available commands: add-task, log-study, log-workout, tasks, stats${reset}`);
}
	
