import { z } from "zod";

export const TaskSchema = z.object({
    id: z.number().optional(),
    userId: z.number(),
    title: z.string(),
    completed: z.boolean(),
});

export type Task = z.infer<typeof TaskSchema>;
