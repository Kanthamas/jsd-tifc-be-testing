import { createClient } from "@libsql/client";
import chalk from "chalk";

const db = createClient({
	url: process.env.TURSO_DB_URL,
	authToken: process.env.TURSO_AUTH_TOKEN,
});

// initailize TURSO_DB tables (users, notes)
const initDB = async () => {
	try {
		await db.execute(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );`);

		await db.execute(`CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
			tags TEXT, --JSON-encoded array of strings
			is_pinned INTEGER DEFAULT 0, -- 0 = false, 1 = true
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			user_id INTEGER,
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`);

		console.log(chalk.bgCyan(`Database tables initialized successfully`));
	} catch (error) {
		console.error(
			chalk.bgMagenta(`Failed to initialized database tables\n ${error}`)
		);
	}
};

initDB();

export default db;
