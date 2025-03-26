import { Repository } from "typeorm";
import { AppDataSource } from "../../ormconfig";
import { Projeto } from "../entities/Projeto";
import { AreaAtuacao } from "../entities/AreaAtuacao";

export class ProjetoService {
    private projectRepo: Repository<Projeto>;
    private areaAtuacaoRepo: Repository<AreaAtuacao>

    constructor(){
        this.projectRepo = AppDataSource.getRepository(Projeto)
        this.areaAtuacaoRepo = AppDataSource.getRepository(AreaAtuacao)

    }

    async createProjeto(data: Partial<Projeto>): Promise<Projeto>{
        const project = this.projectRepo.create(data)
        return await this.projectRepo.save(project)
    }

    async getAllProjeto(): Promise<Projeto[]>{
        return await this.projectRepo.find()
    }

    async getProjetoById(id: number): Promise<Projeto | null>{
        return await this.projectRepo.findOne({
            where: { proj_id: id },
            relations: ["area_atuacao"] // Inclui a área de atuação
        });
    }

    async updateProjeto(id: number, data: Partial<Projeto>): Promise<Projeto>{
        const projeto = await this.projectRepo.findOne({ where: { proj_id: id }, relations: ["area_atuacao"] });

        if(!projeto){
           throw new Error("Projeto não encontrado")
        }
        // Se "data.area_atuacao" for um objeto com um ID, busca a área de atuação correspondente
        if (data.area_atuacao && typeof data.area_atuacao === "object" && "area_atuacao_id" in data.area_atuacao) {
            const areaAtuacao = await this.areaAtuacaoRepo.findOneBy({ area_atuacao_id: data.area_atuacao.area_atuacao_id });

            if (!areaAtuacao) {
                throw new Error("Área de atuação não encontrada");
            }

            projeto.area_atuacao = areaAtuacao;
        } else if (data.area_atuacao === null) {
            // Permite remover a área de atuação
            projeto.area_atuacao = null;
        }

        Object.assign(projeto, data);
        await this.projectRepo.save(projeto);

        return this.projectRepo.findOne({ where: { proj_id: id }, relations: ["area_atuacao"] }) as Promise<Projeto>;
    }

    async deleteProjeto(id: number): Promise<Projeto>{
        await this.projectRepo.update(id, {
            proj_excluido: true
        })
        return await this.projectRepo.findOneBy({proj_id: id})
    }
}