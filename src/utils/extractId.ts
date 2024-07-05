import { verifyJWT } from "./jwt";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function extractId(c: Context): Promise<number | null> {
    const authHeader = c.req.header("authorization");
    if (!authHeader) {
        throw new HTTPException(401, { message: "No token provided" });
    }
    const token = authHeader.split(" ")[0];
    if (!token) {
        throw new HTTPException(401, { message: "No token provided" });
    }
    try {
        const user = await verifyJWT(token, c.env.JWT_SECRET);
        if (!user) {
            throw new HTTPException(401, { message: "Invalid token" });
        }
        return user.id;
    } catch {
        throw new HTTPException(401, { message: "Invalid token" });
    }
}
