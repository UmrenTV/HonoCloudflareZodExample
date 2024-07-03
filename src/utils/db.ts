import { drizzle } from "drizzle-orm";
import { Database } from "sqlite3";

const sqlite = new Database("database.sqlite");

export const Drizzle = drizzle(sqlite);

export const initialize = async () => {
    // Initialize Database schema
    await Drizzle.query(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
                                    )

                        `);

    await Drizzle.query(`
CREATE TABLE IF NOT EXISTS tasks (
id INTEGER PRIMARY KEY AUTOINCREMENT,
userId INTEGER NOt NULL,
title TEXT NOT NULL,
completed BOOLEAN NOT NULL DEFAULT 0,
FOREIGN KEY (userId) REFERENCES users(id)
)
                        `);
};
