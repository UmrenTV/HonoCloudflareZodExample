import { z } from "zod";

export enum UserRole {
    User = "user",
    Admin = "admin",
}

export const UserSchema = z.object({
    id: z.number().optional(),
    username: z.string(),
    password: z.string(),
    role: z.nativeEnum(UserRole).default(UserRole.User),
});

export type User = z.infer<typeof UserSchema>;

export interface IUser extends User {
    role: UserRole;
}
