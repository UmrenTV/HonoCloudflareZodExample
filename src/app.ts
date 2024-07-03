import { Hono } from "hono";
import { authRoutes } from "./routes/authRoutes";
import { taskRoutes } from "./routes/taskRoutes";

const app = new Hono();

app.route("/auth", authRoutes);
app.route("/task", taskRoutes);

export default app;
