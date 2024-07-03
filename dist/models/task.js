"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = void 0;
const zod_1 = require("zod");
exports.TaskSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    userId: zod_1.z.number(),
    title: zod_1.z.string(),
    completed: zod_1.z.boolean(),
});
