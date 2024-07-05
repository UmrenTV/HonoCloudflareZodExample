import { Context, Next } from "hono";
import { verifyJWT } from "../utils/jwt";
import { Errors } from "../types/messages.d";

export const authMiddleware = async (c: Context, next: Next) => {
    const authHeader = c.req.header("authorization");
    if (!authHeader) {
        return c.json({ message: Errors.NoToken }, 401);
    }
    const token = authHeader.split(" ")[0];

    try {
        const user = await verifyJWT(token, c.env.JWT_SECRET);
        if (!user) {
            return c.json({ message: Errors.InvalidToken }, 401);
        }
        c.set("user", user);
        c.set("token", token);
        await next();
    } catch (error) {
        return c.json({ message: Errors.InvalidToken }, 401);
    }
};
