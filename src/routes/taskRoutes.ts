import { Hono } from "hono";
import { UserRole } from "../models/user";
import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
} from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const taskRoutes = new Hono();

taskRoutes.use("*", authMiddleware);
taskRoutes.post("/", roleMiddleware(UserRole.User), createTask);
taskRoutes.get("/", roleMiddleware(UserRole.User), getAllTasks);
taskRoutes.get("/:id", roleMiddleware(UserRole.User), getTaskById);
taskRoutes.put("/", roleMiddleware(UserRole.User), updateTask);
taskRoutes.delete("/:id", roleMiddleware(UserRole.User), deleteTask);

export { taskRoutes };
