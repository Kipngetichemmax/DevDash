const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// 1. Setup paths
const dbPath = path.join(__dirname, '..', 'devdash.db');
const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');

// 2. Initialize connection
const db = new Database(dbPath);

// 3. Ensure tables and columns exist
try {
    // 1. Create the base table if it doesn't exist
    db.exec(`CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);`);

    // 2. Check current columns
    const columns = db.prepare("PRAGMA table_info(goals)").all();
    const colNames = columns.map(c => c.name);

    // 3. Add 'target' if missing
    if (!colNames.includes('target')) {
        db.exec("ALTER TABLE goals ADD COLUMN target INTEGER DEFAULT 0;");
        console.log("\x1b[33m⚠️  Added 'target' column to goals table.\x1b[0m");
    }

    // 4. Add 'current' if missing
    if (!colNames.includes('current')) {
        db.exec("ALTER TABLE goals ADD COLUMN current INTEGER DEFAULT 0;");
        console.log("\x1b[33m⚠️  Added 'current' column to goals table.\x1b[0m");
    }
} catch (error) {
    console.error("\x1b[31mCritical Error: Database migration failed\x1b[0m", error.message);
}



// 4. Final success log
console.log("\x1b[32m✅ Database initialized successfully.\x1b[0m");

module.exports = db;

