import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { verifyJWT } from "../utils/jwt";
import { UserRole } from "../models/user";
import { Errors } from "../types/messages.d";

export const roleMiddleware =
    (requiredRole: UserRole) => async (c: Context, next: Next) => {
        const authHeader = c.req.header("authorization");
        if (!authHeader) {
            throw new HTTPException(401, {
                message: Errors.NoAuthHeader,
            });
        }
        const token = authHeader.split(" ")[0];
        if (!token) {
            throw new HTTPException(401, { message: Errors.NoToken });
        }

        try {
            const payload = await verifyJWT(token, c.env.JWT_SECRET);
            if (!payload || payload.role !== requiredRole) {
                throw new HTTPException(403, { message: Errors.Unauthorized });
            }
            await next();
        } catch (error) {
            if (error instanceof HTTPException) {
                return c.json({ message: error.message }, error.status);
            } else {
                return c.json({ message: Errors.ServerError }, 500);
            }
        }
    };
