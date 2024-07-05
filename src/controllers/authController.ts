import { Context } from "hono";
import { UserSchema, UserRole } from "../models/user";
import { hashPassword, verifyPassword } from "../utils/auth";
import { createJWT } from "../utils/jwt";
import { Success, Errors } from "../types/messages.d";

// Interfaces for the Register/Login response/request

interface RegisterRequest {
    username: string;
    password: string;
}

interface RegisterResponse {
    message: string;
}

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    message: string;
    token?: string;
}

export const register = async (c: Context): Promise<Response> => {
    const body = (await c.req.json()) as RegisterRequest;
    const parsed = UserSchema.safeParse(body);
    if (!parsed.success) {
        const errorResponse: RegisterResponse = {
            message: parsed.error.issues
                .map((issue) => issue.message)
                .join(", "),
        };
        return c.json(errorResponse, 400);
    }
    const { username, password } = parsed.data;
    const hashedPassword = await hashPassword(password);
    await c.env.DATABASE.prepare(
        "INSERT INTO users (username, password, role) VALUES (?,?, ?)"
    )
        .bind(username, hashedPassword, UserRole.User)
        .run();
    const successResponse: RegisterResponse = {
        message: Success.UserRegistered,
    };
    return c.json(successResponse, 201);
};

export const login = async (c: Context): Promise<Response> => {
    const body = (await c.req.json()) as LoginRequest;
    const parsed = UserSchema.safeParse(body);
    if (!parsed.success) {
        const errorResponse: LoginResponse = {
            message: parsed.error.issues
                .map((issue) => issue.message)
                .join(", "),
        };
        return c.json(errorResponse, 400);
    }
    const { username, password } = parsed.data;
    const { results } = await c.env.DATABASE.prepare(
        "SELECT * FROM users WHERE username = ?"
    )
        .bind(username)
        .all();
    const user = results[0];
    if (user && (await verifyPassword(password, user.password))) {
        const token = await createJWT(
            { id: user.id, role: user.role },
            c.env.JWT_SECRET
        );
        const successResponse: LoginResponse = {
            message: Success.UserLogged,
            token,
        };
        return c.json(successResponse, 200);
    }
    const errorResponse: LoginResponse = {
        message: Errors.InvalidCredentials,
    };
    return c.json(errorResponse, 400);
};
