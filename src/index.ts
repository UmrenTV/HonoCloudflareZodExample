import app from "./app";
import { initDb } from "./initDb";

export default {
    async fetch(request: Request, env: any): Promise<Response> {
        await initDb(env); // Initialize the database
        return app.fetch(request, env);
    },
};
