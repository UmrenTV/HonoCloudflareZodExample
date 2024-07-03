"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const authRoutes_1 = require("./routes/authRoutes");
const taskRoutes_1 = require("./routes/taskRoutes");
const app = new hono_1.Hono();
app.route("/auth", authRoutes_1.authRoutes);
app.route("/task", taskRoutes_1.taskRoutes);
exports.default = app;
