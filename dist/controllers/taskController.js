"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.getTask = exports.createTask = void 0;
const task_1 = require("../models/task");
const createTask = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = task_1.TaskSchema.safeParse(c.req.json());
    if (!parsed.success) {
        return c.json(parsed.error, 400);
    }
    const { userId, title, completed } = parsed.data;
    yield c.env.DATABASE.prepare(`INSERT INTO tasks (userId, title, completed) VALUES (?, ?, ?)`)
        .bind(userId, title, completed)
        .run();
    return c.json({ message: "Task created successfully." });
});
exports.createTask = createTask;
const getTask = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const { results } = yield c.env.DATABASE.prepare(`SELECT * FROM tasks WHERE userId = ?`)
        .bind(c.req.param("userId"))
        .run();
    return c.json(results);
});
exports.getTask = getTask;
const deleteTask = (c) => __awaiter(void 0, void 0, void 0, function* () {
    yield c.env.DATABASE.prepare(`DELETE FROM tasks WHERE id = ?`)
        .bind(c.req.param("taskId"))
        .run();
    return c.json({ message: "Task deleted successfully." });
});
exports.deleteTask = deleteTask;
