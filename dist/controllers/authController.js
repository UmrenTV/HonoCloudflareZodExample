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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../utils/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "your_secret_key";
const register = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = user_1.UserSchema.safeParse(c.req.json());
    if (!parsed.success) {
        return c.json(parsed.error, 400);
    }
    const { username, password } = parsed.data;
    const hashedPassword = (0, auth_1.hash)(password);
    yield c.env.DATABASE.prepare(`INSERT INTO users (username, password) VALUES (?,?)`)
        .bind(username, hashedPassword)
        .run();
    //   await Drizzle.query(
    //       `INSERT INTO users (username, password) VALUES (?, ?)`,
    //       [username, hashedPassword]
    //   );
    return c.json({ message: "User registered successfully" });
});
exports.register = register;
const login = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = user_1.UserSchema.safeParse(c.req.json());
    if (!parsed.success) {
        return c.json(parsed.error, 400);
    }
    const { username, password } = parsed.data;
    const { results } = yield c.env.DATABASE.prepare("SELECT FROM users WHERE username = ?")
        .bind(username)
        .all();
    const user = results[0];
    if (user && (yield (0, auth_1.verify)(password, user.password))) {
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: "1h",
        });
        // create session
        return c.json({ message: "Login successful", token });
    }
    return c.json({ message: "Invalid credentials" }, 401);
});
exports.login = login;
