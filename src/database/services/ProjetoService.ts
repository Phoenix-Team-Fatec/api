import { Repository } from "typeorm";
import { AppDataSource } from "../../ormconfig";
import { Projeto } from "../entities/Projeto";

export class ProjetoService {
    private projectRepo: Repository<Projeto>;

    constructor(){
        this.projectRepo = AppDataSource.getRepository(Projeto)
    }

    async createProjeto(data: Partial<Projeto>): Promise<Projeto>{
        const project = this.projectRepo.create(data)
        return await this.projectRepo.save(project)
    }

    async getAllProjeto(): Promise<Projeto[]>{
        return await this.projectRepo.find()
    }

    async getProjetoById(id: number): Promise<Projeto | null>{
        return await this.projectRepo.findOneBy({proj_id: id})
    }

    async updateProjeto(id: number, data: Partial<Projeto>): Promise<Projeto>{
        await this.projectRepo.update(id, data)
        return await this.projectRepo.findOneBy({proj_id: id})
    }

    async deleteProjeto(id: number): Promise<Projeto>{
        await this.projectRepo.update(id, {
            proj_excluido: true
        })
        return await this.projectRepo.findOneBy({proj_id: id})
    }
}