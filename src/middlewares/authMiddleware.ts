import { Context, Next } from "hono";
import { verifyJWT } from "../utils/jwt";

const JWT_SECRET = "your_secret_key";

export const authMiddleware = async (c: Context, next: Next) => {
    const authHeader = c.req.header("authorization");
    if (!authHeader) {
        return c.json({ message: "No token provided" }, 401);
    }

    console.log(authHeader, "AUTH HEADER");

    const token = authHeader.split(" ")[0];
    console.log(token, "TOKEN");
    try {
        const user = await verifyJWT(token, JWT_SECRET);
        if (!user) {
            return c.json({ message: "Invalid token" }, 401);
        }
        c.set("user", user);
        await next();
    } catch (error) {
        return c.json({ message: "Invalid token" }, 401);
    }
};
