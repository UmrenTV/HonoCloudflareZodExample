import { Context, Next } from "hono";
import { verifyJWT } from "../utils/jwt";

export const authMiddleware = async (c: Context, next: Next) => {
    const authHeader = c.req.header("authorization");
    if (!authHeader) {
        return c.json({ message: "No token provided" }, 401);
    }
    const token = authHeader.split(" ")[0];

    try {
        const user = await verifyJWT(token, c.env.JWT_SECRET);
        if (!user) {
            return c.json({ message: "Invalid token" }, 401);
        }
        c.set("user", user);
        await next();
    } catch (error) {
        return c.json({ message: "Invalid token" }, 401);
    }
};
