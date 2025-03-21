import "reflect-metadata"
import express from "express";
import { routes } from "./database/routes";
import { AppDataSource } from "./ormconfig";
import { BaseEntity } from "typeorm";
import { etapaRoutes } from "./database/routes/etapa_routes";
import cors from "cors";

AppDataSource.initialize()
    .then(() => {
        BaseEntity.useDataSource(AppDataSource);

        const app = express();
        app.use(express.json());
        app.use(cors(), routes);

        app.listen(3000, () => console.log("Server running on port 3000"));

        app.use("/api", etapaRoutes);
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });