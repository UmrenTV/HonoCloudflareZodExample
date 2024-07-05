import { Context } from "hono";
import { TaskSchema, Task } from "../models/task";
import { BaseService } from "../services/baseService";
import { extractId } from "../utils/extractId";
import { Success, Errors } from "../types/messages.d";

const taskService = new BaseService<Task>("tasks");

export const createTask = async (c: Context) => {
    const body = await c.req.json();
    const userId = await extractId(c);
    if (typeof userId !== "number") {
        return c.json({ message: Errors.InvalidToken }, 401);
    }
    body.userId = userId;
    const parsed = TaskSchema.safeParse(await c.req.json());
    if (!parsed.success) {
        return c.json(parsed.error, 400);
    }
    await taskService.create(c, parsed.data);
    return c.json({ message: Success.TaskCreated }, 201);
};

export const getAllTasks = async (c: Context) => {
    const id = await extractId(c);
    if (typeof id === "number") {
        const results = await taskService.getAll(c, id);
        return c.json(results);
    }
    return c.json({ message: Errors.InvalidToken }, 401);
};

export const getTaskById = async (c: Context) => {
    const id = Number(c.req.param("id"));
    const userId = await extractId(c);
    if (typeof userId !== "number") {
        return c.json({ message: Errors.InvalidToken }, 401);
    }
    if (!(await taskService.checkOwnership(c, id, userId))) {
        return c.json({ message: Errors.InvalidTask }, 401);
    }
    const results = await taskService.getById(c, id);
    return c.json(results);
};

export const updateTask = async (c: Context) => {
    const body = await c.req.json();
    const userId = await extractId(c);
    if (typeof userId !== "number") {
        return c.json({ message: Errors.InvalidToken }, 401);
    }
    body.userId = userId;
    const parsed = TaskSchema.safeParse(await c.req.json());
    if (!parsed.success) {
        return c.json(parsed.error, 400);
    }
    const { id, title, completed } = parsed.data;
    if (!(await taskService.checkOwnership(c, Number(id), userId))) {
        return c.json({ message: Errors.InvalidTask }, 401);
    }
    await taskService.update(c, Number(id), {
        userId,
        title,
        completed,
    });
    return c.json({ message: Success.TaskUpdated });
};

export const deleteTask = async (c: Context) => {
    const userId = await extractId(c);
    const id = Number(c.req.param("id"));
    if (typeof userId !== "number") {
        return c.json({ message: Errors.InvalidToken }, 401);
    }
    if (!(await taskService.checkOwnership(c, id, userId))) {
        return c.json({ message: Errors.InvalidTask }, 401);
    }
    await taskService.delete(c, id);
    return c.json({ message: Success.TaskDeleted });
};
