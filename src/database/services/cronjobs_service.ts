import { ProjetoService } from "./ProjetoService";
import { AppDataSource } from "../../ormconfig";

const projetoService = new ProjetoService();

async function executarLimpezaDiaria() {
    try {
        await AppDataSource.initialize();
        console.log("Iniciando limpeza de projetos excluídos...");
        await projetoService.limparProjetosExcluidos();
        console.log("Limpeza concluída com sucesso!");
    } catch (error) {
        console.error("Erro durante a limpeza:", error);
    } finally {
        await AppDataSource.destroy();
    }
}

executarLimpezaDiaria();