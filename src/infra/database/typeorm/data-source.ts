import path from "node:path";
import { fileURLToPath } from "node:url";
import { env, isProd, isTest } from "config/env.js";
import { DataSource } from "typeorm";

import { TodoModel } from "./models/todo.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: isTest ? `${env.DB_NAME}_test` : env.DB_NAME,

  synchronize: !isProd,
  logging: !isTest,

  entities: [TodoModel],
  migrations: [path.join(__dirname, "migrations", "*.{ts,js}")],
});
