import { DataSource } from "typeorm";
import "dotenv/config";
import "reflect-metadata";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ["src/database/entities/*.ts"],
    subscribers: [],
    migrations: [],
})