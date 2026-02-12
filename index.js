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

    // 🎨 Color Palette
    const c = {
        cyan: "\x1b[36m", yellow: "\x1b[33m", green: "\x1b[32m",
        orange: "\x1b[38;5;208m", red: "\x1b[31m", gray: "\x1b[90m",
        bold: "\x1b[1m", reset: "\x1b[0m"
    };

    // 📊 Progress Bar
    const drawBar = (cur, tar) => {
        const size = 10;
        const filled = Math.min(Math.floor((cur / (tar || 1)) * size), size);
        let color = c.red;
        if (filled === size) color = c.green;
        else if (filled >= size * 0.5) color = c.yellow;
        else if (filled >= size * 0.25) color = c.orange;
        return `${color}${"#".repeat(filled)}${c.gray}${"-".repeat(size - filled)}${c.reset}`;
    };

    console.log(`\n${c.bold}${c.cyan}🚀 DEVDASH v2.4${c.reset} ${c.gray}• PERFORMANCE SUMMARY${c.reset}`);
    console.log(`${c.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);

    // ⚡ Quick Stats
    const allTasks = stats.tasks || [];
    const pending = allTasks.filter(t => t.status === "pending").length;
    const inProgress = allTasks.filter(t => t.status === "in-progress").length;
    const done = allTasks.filter(t => t.status === "completed").length;
    const totalHrs = (stats.study || []).reduce((a, s) => a + (s.hours || 0), 0);
    console.log(`${c.yellow}⚠ ${pending} Open${c.reset} | ${c.orange}● ${inProgress} In-Progress${c.reset} | ${c.green}✔ ${done} Done${c.reset} | ${c.orange}🔥 ${stats.studyStreak || 0} Day Streak${c.reset} | ${c.cyan}📚 ${totalHrs}h${c.reset}\n`);

    // 📝 Top Pending Tasks
    const taskTable = new Table({
        head: [c.gray+'ID'+c.reset, c.gray+'Status'+c.reset, c.gray+'Task Title'+c.reset, c.gray+'Due'+c.reset],
        colWidths: [6, 14, 34, 12]
    });
    allTasks.slice(0, 5).forEach(t => {
        let statusIcon = t.status === "completed" ? c.green + "✔ DONE" :
                         t.status === "in-progress" ? c.orange + "● IN-PROGRESS" :
                         c.yellow + "○ OPEN";

        let dueText = t.due_date && new Date(t.due_date) < new Date() && t.status !== "completed"
            ? c.red + t.due_date + c.reset
            : t.due_date || "-";

        taskTable.push([t.id, statusIcon + c.reset, t.title, dueText]);
    });
    console.log(`${c.bold}📝 TOP 5 TASKS${c.reset}`);
    console.log(taskTable.toString());

    // 🕒 Recent Activity
    const activityTable = new Table({
        head: [c.cyan+'📚 Last 3 Study Logs'+c.reset, c.orange+'💪 Last 3 Workouts'+c.reset],
        colWidths: [30, 28]
    });
    const recentS = (stats.study || []).slice(-3).reverse()
        .map(s => `${c.gray}•${c.reset} ${s.subject}: ${c.bold}${s.hours}h${c.reset}`).join('\n') || 'No logs yet';
    const recentW = (stats.workout || []).slice(-3).reverse()
        .map(w => `${c.gray}•${c.reset} ${w.exercise}: ${c.bold}${w.sets}s${c.reset}`).join('\n') || 'No logs yet';
    activityTable.push([recentS, recentW]);
    console.log(`\n${c.bold}🕒 RECENT ACTIVITY${c.reset}`);
    console.log(activityTable.toString());

    // 🎯 Active Goals
    const goalTable = new Table({
        head: [c.gray+'Goal'+c.reset, c.gray+'Progress'+c.reset, c.gray+'Status Bar'+c.reset, c.gray+'%'+c.reset],
        colWidths: [22, 12, 14, 8]
    });
    (stats.goals || []).forEach(g => {
        const pct = g.target > 0 ? Math.round((g.current / g.target) * 100) : 0;
        const pctColor = pct === 100 ? c.green : pct >= 50 ? c.yellow : pct >= 25 ? c.orange : c.red;
        goalTable.push([g.name, `${g.current}/${g.target}`, drawBar(g.current, g.target), pctColor + pct + '%' + c.reset]);
    });
    console.log(`\n${c.bold}🎯 ACTIVE GOALS${c.reset}`);
    console.log(goalTable.toString());

    // 💡 Footer Tip
    console.log(`\n${c.gray}💡 Tip: Use ${c.reset}${c.cyan}node index.js add-task "Title"${c.reset}${c.gray} to grow your list!${c.reset}\n`);
    break;
    default:
        console.log(`${yellow}Available commands: add-task, log-study, log-workout, tasks, stats${reset}`);
}
	
