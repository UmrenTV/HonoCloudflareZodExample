import { Hono } from "hono";
import { createTask, getTask, deleteTask } from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const taskRoutes = new Hono();

taskRoutes.use("*", authMiddleware);
taskRoutes.post("/", createTask);
taskRoutes.get("/:userId", getTask);
taskRoutes.delete("/:taskId", deleteTask);

export { taskRoutes };
