import "reflect-metadata"
import express from "express";
import { routes } from "./database/routes";
import { AppDataSource } from "./ormconfig";
import { BaseEntity } from "typeorm";
import cron from 'node-cron';
import { ProjetoService } from "./database/services/ProjetoService";
import cors from "cors";
import path from "path";
        
cron.schedule('0 1 * * *', async () => {
    console.log('Executando limpeza de projetos excluídos...');
    const projetoService = new ProjetoService();
    await projetoService.limparProjetosExcluidos();
});

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