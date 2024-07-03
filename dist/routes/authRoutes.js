"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const hono_1 = require("hono");
const authController_1 = require("../controllers/authController");
const authRoutes = new hono_1.Hono();
exports.authRoutes = authRoutes;
authRoutes.post("/register", authController_1.register);
authRoutes.post("/login", authController_1.login);
