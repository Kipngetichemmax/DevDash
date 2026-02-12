# DevDash

A terminal-based **developer productivity dashboard** built in Node.js.  
Track your **tasks, study sessions, workouts, and goals** all from the command line.  

---

## 🚀 Features

- **Tasks**: Create, track, and mark tasks as done.  
- **Study Logs**: Track study hours by subject and monitor your streak.  
- **Workouts**: Log exercises and number of sessions.  
- **Goals**: Set long-term goals and track progress as a percentage.  
- **Dashboard**: View a clean summary of tasks, study, workouts, and goals in one place.  

---

## 💻 Setup

1. **Clone the repo**  

```bash
git clone https://github.com/<your-username>/DevDash.git
cd DevDash

2. Install dependencies



npm install

3. Run the CLI



node index.js stats


---

📋 Available Commands

Command	Description

add-task "<title>" --priority <level>	Add a new task (low, medium, high)
complete-task <task_id>	Mark a task as done
log-study "<subject>" <hours>	Log study hours for a subject
log-workout "<exercise>" <reps_or_time> <sets>	Log workout sessions
add-goal "<goal name>" <target_value>	Add a new goal
log-progress <goal_id> <amount>	Increment progress on a goal
tasks	List all tasks
stats	Show the dashboard summary


> Example:



node index.js add-task "Finish Calculus Practice" --priority medium
node index.js log-study "Calculus" 2
node index.js log-workout "Pull-ups" 10 3
node index.js add-goal "Read 5 books" 5
node index.js log-progress 1 1
node index.js stats


---

📊 Dashboard Example

📊 DEV DASHBOARD SUMMARY
====================================
📝 TASKS: Total: 8 | Pending: 8 | Done: 0

📚 STUDY LOG (Streak: 1 days)
┌────────────────────┬──────────┐
│ Subject            │ Hours    │
└────────────────────┴──────────┘

💪 WORKOUT LOG
┌────────────────────┬──────────┐
│ Exercise           │ Sessions │
└────────────────────┴──────────┘

🎯 GOALS
┌────────────────────┬────────────┬────────┐
│ Goal               │ Progress   │ %      │
├────────────────────┼────────────┼────────┤
│ Read 5 books       │ 0/5        │ 0%     │
└────────────────────┴────────────┴────────┘


---

⚡ Next Steps / Planned Features

Show individual tasks in the stats dashboard

Colorized CLI output for completed vs pending tasks

Enhanced study/workout analytics

Export stats to CSV or JSON

Optional API layer for remote dashboard



---

🛠 Tech Stack

Node.js

SQLite (better-sqlite3)

CLI-based tables (cli-table3)

Chalk (for colors)



---

📜 License

MIT License © 2026
