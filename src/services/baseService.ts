import { Context } from "hono";

interface IBaseService<T extends Record<string, unknown>> {
    create(c: Context, item: T): Promise<void>;
    getById(c: Context, id: number): Promise<T | null>;
    update(c: Context, id: number, item: T): Promise<void>;
    delete(c: Context, id: number): Promise<void>;
}

export class BaseService<T extends Record<string, unknown>>
    implements IBaseService<T>
{
    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async create(c: Context, item: T): Promise<void> {
        const keys = Object.keys(item).join(", ");
        const values = Object.values(item);
        const placeholders = values.map(() => "?").join(", ");
        const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`;
        await c.env.DATABASE.prepare(query)
            .bind(...values)
            .run();
    }

    async getAll(c: Context, userId: number): Promise<T[] | null> {
        const query = `SELECT * FROM ${this.tableName} WHERE userId = ?`;
        const { results } = await c.env.DATABASE.prepare(query)
            .bind(userId)
            .run();
        return results.length ? (results as T[]) : null;
    }

    async getById(c: Context, id: number): Promise<T | null> {
        const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        const { results } = await c.env.DATABASE.prepare(query).bind(id).run();
        return results.length ? (results[0] as T) : null;
    }
    async update(c: Context, id: number, item: T): Promise<void> {
        const keys = Object.keys(item)
            .map((key) => `${key} = ?`)
            .join(", ");
        const values = Object.values(item);
        const query = `UPDATE ${this.tableName} SET ${keys} WHERE id = ?`;
        await c.env.DATABASE.prepare(query)
            .bind(...values, id)
            .run();
    }
    async delete(c: Context, id: number): Promise<void> {
        const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
        await c.env.DATABASE.prepare(query).bind(id).run();
    }
    async checkOwnership(
        c: Context,
        id: number,
        userId: number
    ): Promise<boolean> {
        const query = `SELECT * FROM ${this.tableName} WHERE id = ? AND userId = ?`;
        const { results } = await c.env.DATABASE.prepare(query)
            .bind(id, userId)
            .run();

        console.log(results, "RESULTS", results.length);
        return results.length ? true : false;
    }
}
