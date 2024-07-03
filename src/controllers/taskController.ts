import { Context } from "hono";
import { TaskSchema } from "../models/task";

export const createTask = async (c: Context) => {
    const parsed = TaskSchema.safeParse(await c.req.json());
    if (!parsed.success) {
        return c.json(parsed.error, 400);
    }
    const { userId, title, completed } = parsed.data;
    await c.env.DATABASE.prepare(
        `INSERT INTO tasks (userId, title, completed) VALUES (?, ?, ?)`
    )
        .bind(userId, title, completed)
        .run();
    return c.json({ message: "Task created successfully." });
};

export const getTask = async (c: Context) => {
    const { results } = await c.env.DATABASE.prepare(
        `SELECT * FROM tasks WHERE userId = ?`
    )
        .bind(c.req.param("userId"))
        .run();
    return c.json(results);
};

export const updateTask = async (c: Context) => {
    const parsed = TaskSchema.safeParse(await c.req.json());
    if (!parsed.success) {
        return c.json(parsed.error, 400);
    }
    const { id, userId, title, completed } = parsed.data;
    await c.env.DATABASE.prepare(
        "UPDATE tasks SET title = ?, completed = ? WHERE id = ? AND userId = ?"
    )
        .bind(title, completed, id, userId)
        .run();
    return c.json({ message: "Task updated successfully." });
};

export const deleteTask = async (c: Context) => {
    await c.env.DATABASE.prepare(`DELETE FROM tasks WHERE id = ?`)
        .bind(c.req.param("taskId"))
        .run();
    return c.json({ message: "Task deleted successfully." });
};
