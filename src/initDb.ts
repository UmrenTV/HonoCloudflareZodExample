export async function initDb(env: any) {
    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user'
    );
  `;
    const createTasksTable = `
CREATE TABLE IF NOT EXISTS tasks (
id INTEGER PRIMARY KEY AUTOINCREMENT,
userId INTEGER NOt NULL,
title TEXT NOT NULL,
completed BOOLEAN NOT NULL DEFAULT 0,
FOREIGN KEY (userId) REFERENCES users(id)
)
  `;

    await env.DATABASE.prepare(createUsersTable).run();
    await env.DATABASE.prepare(createTasksTable).run();
}
