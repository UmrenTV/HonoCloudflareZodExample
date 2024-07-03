import { z } from "zod";

export const UserSchema = z.object({
    id: z.number().optional(),
    username: z.string(),
    password: z.string(),
});

export type User = z.infer<typeof UserSchema>;
