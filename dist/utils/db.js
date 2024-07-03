"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.Drizzle = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const sqlite3_1 = require("sqlite3");
const sqlite = new sqlite3_1.Database("database.sqlite");
exports.Drizzle = (0, drizzle_orm_1.drizzle)(sqlite);
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize Database schema
    yield exports.Drizzle.query(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
                                    )

                        `);
    yield exports.Drizzle.query(`
CREATE TABLE IF NOT EXISTS tasks (
id INTEGER PRIMARY KEY AUTOINCREMENT,
userId INTEGER NOt NULL,
title TEXT NOT NULL,
completed BOOLEAN NOT NULL DEFAULT 0,
FOREIGN KEY (userId) REFERENCES users(id)
)
                        `);
});
exports.initialize = initialize;
