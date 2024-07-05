import { D1Database } from "@cloudflare/workers-types";

export interface Env {
    DATABASE: D1Database;
    JWT_SECRET: string;
}
