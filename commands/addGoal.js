const db = require('../config/db');

module.exports = (args) => {
    const name = args[0];
    const target = parseInt(args[1]);

    if (!name || isNaN(target)) {
        console.log("\x1b[31mUsage: node index.js add-goal \"Goal Name\" <target_number>\x1b[0m");
        return;
    }

    try {
        const stmt = db.prepare("INSERT INTO goals (name, target, current) VALUES (?, ?, 0)");
        stmt.run(name, target);
        console.log(`\x1b[32m✅ Goal Added: "${name}" with target ${target}\x1b[0m`);
    } catch (err) {
        console.error("\x1b[31mError adding goal:\x1b[0m", err.message);
    }
};

