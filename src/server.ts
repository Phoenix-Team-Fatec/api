import "reflect-metadata"
import express from "express";
import { routes } from "./database/routes";
import { AppDataSource } from "./ormconfig";
import { BaseEntity } from "typeorm";
import cors from "cors";
import path from "path";

AppDataSource.initialize()
    .then(() => {
        BaseEntity.useDataSource(AppDataSource);

        const app = express();
        app.use(express.json());
        app.use(cors(), routes);
        app.use("/uploads", express.static(path.join(__dirname, "uploads")));

        app.listen(3000, () => console.log("Server running on port 3000"));

        
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });