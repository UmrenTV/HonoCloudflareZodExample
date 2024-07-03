import { Context } from "hono";
import { UserSchema } from "../models/user";
import { hashPassword, verifyPassword } from "../utils/auth";
import { createJWT } from "../utils/jwt";

export const register = async (c: Context) => {
    const body = await c.req.json();
    const parsed = UserSchema.safeParse(body);
    if (!parsed.success) {
        return c.json(parsed.error, 400);
    }
    const { username, password } = parsed.data;
    const hashedPassword = await hashPassword(password);
    await c.env.DATABASE.prepare(
        "INSERT INTO users (username, password) VALUES (?,?)"
    )
        .bind(username, hashedPassword)
        .run();
    return c.json({ message: "User registered successfully" });
};

export const login = async (c: Context) => {
    const body = await c.req.json();
    const parsed = UserSchema.safeParse(body);
    if (!parsed.success) {
        return c.json(parsed.error, 400);
    }
    const { username, password } = parsed.data;
    const { results } = await c.env.DATABASE.prepare(
        "SELECT * FROM users WHERE username = ?"
    )
        .bind(username)
        .all();
    const user = results[0];
    if (user && (await verifyPassword(password, user.password))) {
        const token = await createJWT({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ message: "Login successful", token });
    }
    return c.json({ message: "Invalid credentials" }, 401);
};
