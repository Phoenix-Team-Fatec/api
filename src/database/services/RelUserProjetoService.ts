import { Repository } from "typeorm";
import { AppDataSource } from "../../ormconfig";
import { Usuario } from "../entities/Usuario";
import { Projeto } from "../entities/Projeto";
import { RelUserProjeto } from "../entities/RelUserProjeto";

export class RelUserProjetoService{
    private userRepo: Repository<Usuario>
    private projRepo: Repository<Projeto>
    private relUserProj: Repository<RelUserProjeto>

    constructor(){
        this.userRepo = AppDataSource.getRepository(Usuario)
        this.projRepo = AppDataSource.getRepository(Projeto)
        this.relUserProj = AppDataSource.getRepository(RelUserProjeto)
    }

    async createRelUserProjeto(user_id: number, proj_id: number, coordenador: boolean): Promise<Usuario> {
        const user = await this.userRepo.findOne({
            where: { user_id},
            relations: ['projetos']
        })
        if (!user){
            throw new Error('Usuário não encontrado')
        }

        const project = await this.projRepo.findOne({
            where: { proj_id}
        })
        if (!project){
            throw new Error('Projeto nãõ encontrado')
        }

        const relation = this.relUserProj.create({
            user_id,
            proj_id,
            coordenador
        })

        await this.relUserProj.save(relation)
        return this.userRepo.findOne({
            where: { user_id },
            relations: ['projetos']
        })
    }

    async getRelUserProjetoByUser(user_id: number): Promise<any[]> {
        const projetos = await this.projRepo
            .createQueryBuilder("projeto")
            .innerJoin(
                RelUserProjeto,
                "relUserProj",
                "relUserProj.proj_id = projeto.proj_id"
            )
            .innerJoin(Usuario, "usuario", "usuario.user_id = relUserProj.user_id")
            .where("usuario.user_id = :user_id", { user_id })
            .andWhere("projeto.proj_excluido = false")
            .select([
                "projeto.proj_id",
                "projeto.proj_nome",
                "projeto.proj_descricao",
                "projeto.proj_area_atuacao",
                "projeto.proj_data_inicio",
                "projeto.proj_data_fim",
                "projeto.proj_status",
                "relUserProj.coordenador"
            ])
            .getRawMany();
    
        return projetos;
    }
    
    

    async getRelUserProjetoByProjeto(proj_id: number): Promise<Usuario[]> {
        const project = await this.projRepo.findOne({
            where: {proj_id},
            relations: ['usuarios']
        })
        if (!project){
            throw new Error("Projeto não encontrado")
        }

        return project.usuarios
    }

    async deleteRelUserProjeto(user_id: number, projeto_id: number): Promise<void> {
        const user = await this.userRepo.findOne({
            where: { user_id },
            relations: ['projetos']
        })

        user.projetos = user.projetos.filter(projeto => projeto.proj_id != projeto_id)

        await this.userRepo.save(user)
    }
}