import app from "./app";
import { initDb } from "./initDb";
import { Env } from "./types/env.d";

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        await initDb(env); // Initialize the database
        return app.fetch(request, env);
    },
};
