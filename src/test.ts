import { AppDataSource } from "./database/AppDataSource";
import { Projeto } from "./entity/Projeto";
import "reflect-metadata";

async function query() {
    await AppDataSource.initialize();

    const projetoRepo = AppDataSource.getRepository(Projeto);

    const projetos = await projetoRepo.find({
        relations: ["etapas"]
    });

    console.log(projetos)
}

query()