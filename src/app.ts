import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { authRoutes } from "./routes/authRoutes";
import { taskRoutes } from "./routes/taskRoutes";
import { Errors } from "./types/messages.d";

const app = new Hono();

app.route("/auth", authRoutes);
app.route("/task", taskRoutes);

// Global Error Handler
app.onError((err, c) => {
    console.error(err); // Log the error for debugging
    if (err instanceof HTTPException) {
        return c.json({ error: true, message: err.message }, err.status);
    } else {
        return c.json({ error: true, message: Errors.ServerError }, 500);
    }
});

export default app;
