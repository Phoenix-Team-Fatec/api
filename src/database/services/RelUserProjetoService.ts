import { Repository } from "typeorm";
import { AppDataSource } from "../../ormconfig";
import { Usuario } from "../entities/Usuario";
import { Projeto } from "../entities/Projeto";
import { RelUserProjeto } from "../entities/RelUserProjeto";

interface UsuarioComCoordenador extends Usuario {
    coordenador: boolean;
}

export class RelUserProjetoService {
    private userRepo: Repository<Usuario>
    private projRepo: Repository<Projeto>
    private relUserProj: Repository<RelUserProjeto>

    constructor() {
        this.userRepo = AppDataSource.getRepository(Usuario)
        this.projRepo = AppDataSource.getRepository(Projeto)
        this.relUserProj = AppDataSource.getRepository(RelUserProjeto)
    }

    async createRelUserProjeto(proj_id: number, coordenador: boolean, user_email: string, user_id?: number): Promise<Usuario> {
        let user: Usuario | null = null;

        if (user_id) {
            user = await this.userRepo.findOne({
                where: { user_id },
                relations: ['projetos']
            })
            if (!user) {
                throw new Error('Usuário não encontrado')
            }
        } else {
            user = await this.userRepo.findOne({
                where: { user_email }
            });

            if (!user) {
                user = this.userRepo.create({
                    user_email,
                    user_nome: "",
                    registrado: false
                });

                await this.userRepo.save(user);
            }
        }

        const project = await this.projRepo.findOne({
            where: { proj_id }
        })
        if (!project) {
            throw new Error('Projeto nãõ encontrado')
        }

        const relation = this.relUserProj.create({
            user_id: user.user_id,
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
        return await this.projRepo
            .createQueryBuilder("projeto")
            .innerJoin(
                RelUserProjeto,
                "relUserProj",
                "relUserProj.proj_id = projeto.proj_id AND relUserProj.user_id = :user_id",
                { user_id }
            )
            .leftJoin(
                RelUserProjeto,
                "relUsersProj",
                "relUsersProj.proj_id = projeto.proj_id"
            )
            .leftJoin(
                Usuario,
                "usuario",
                "usuario.user_id = relUsersProj.user_id"
            )
            .select([
                "projeto.proj_id",
                "projeto.proj_nome",
                "projeto.proj_descricao",
                "projeto.proj_area_atuacao",
                "projeto.proj_data_inicio",
                "projeto.proj_data_fim",
                "projeto.proj_status",
                "projeto.proj_excluido",
                "projeto.proj_valor_total",
                "projeto.area_atuacao_id",
                "projeto.proj_inst_parceiras",
                "projeto.proj_inst_financiadoras",
                "relUserProj.coordenador as is_coordenador",
                "JSON_AGG(DISTINCT jsonb_build_object(" +
                "'user_id', usuario.user_id, " +
                "'user_nome', usuario.user_nome, " +
                "'user_sobrenome', usuario.user_sobrenome, " +
                "'user_email', usuario.user_email, " +
                "'user_foto', usuario.user_foto, " +
                "'coordenador', relUsersProj.coordenador" +
                ")) as usuarios"
            ])
            .groupBy("projeto.proj_id, relUserProj.coordenador")
            .getRawMany();
    }
    async getRelUserProjetoByUserExcluidos(user_id: number): Promise<any[]> {
        return await this.projRepo
        .createQueryBuilder("projeto")
        .innerJoin(
            RelUserProjeto,
            "relUserProj",
            "relUserProj.proj_id = projeto.proj_id AND relUserProj.user_id = :user_id",
            { user_id }
        )
        .leftJoin(
            RelUserProjeto,
            "relUsersProj",
            "relUsersProj.proj_id = projeto.proj_id"
        )
        .leftJoin(
            Usuario,
            "usuario",
            "usuario.user_id = relUsersProj.user_id"
        )
        .where("projeto.proj_excluido = true") // Apenas projetos não deletados
        .select([
            "projeto.proj_id",
            "projeto.proj_nome",
            "projeto.proj_descricao",
            "projeto.proj_area_atuacao",
            "projeto.proj_data_inicio",
            "projeto.proj_data_fim",
            "projeto.proj_status",
            "projeto.proj_excluido",
            "projeto.proj_valor_total",
            "projeto.area_atuacao_id",
            "relUserProj.coordenador as is_coordenador",
            "JSON_AGG(DISTINCT jsonb_build_object(" +
                "'user_id', usuario.user_id, " +
                "'user_nome', usuario.user_nome, " +
                "'user_sobrenome', usuario.user_sobrenome, " +
                "'user_email', usuario.user_email, " +
                "'user_foto', usuario.user_foto, " +
                "'coordenador', relUsersProj.coordenador" +
            ")) as usuarios"
        ])
        .groupBy("projeto.proj_id, relUserProj.coordenador")
        .getRawMany();
    }
    //ver onde essa função pode ser usada

    // async getRelUserProjetoByUser(user_id: number): Promise<any[]> {
    //     const projetos = await this.projRepo
    //         .createQueryBuilder("projeto")
    //         .innerJoin(
    //             RelUserProjeto,
    //             "relUserProj",
    //             "relUserProj.proj_id = projeto.proj_id"
    //         )
    //         .innerJoin(Usuario, "usuario", "usuario.user_id = relUserProj.user_id")
    //         .where("usuario.user_id = :user_id", { user_id })
    //         .andWhere("projeto.proj_excluido = false")
    //         .select([
    //             "projeto.proj_id",
    //             "projeto.proj_nome",
    //             "projeto.proj_descricao",
    //             "projeto.proj_area_atuacao",
    //             "projeto.proj_data_inicio",
    //             "projeto.proj_data_fim",
    //             "projeto.proj_status",
    //             "relUserProj.coordenador"
    //         ])
    //         .getRawMany();

    //     return projetos;
    // }



    async getRelUserProjetoByProjeto(
        proj_id: number
    ): Promise<UsuarioComCoordenador[]> {
        const project = await this.projRepo.findOne({
            where: { proj_id },
            relations: ['usuarios']
        });
        if (!project) throw new Error("Projeto não encontrado");

        const rels = await this.relUserProj.find({
            where: { proj_id }
        });

        return project.usuarios.map(u => {
            const rel = rels.find(r => r.user_id === u.user_id);
            return {
                ...u,
                coordenador: rel ? rel.coordenador : false
            };
        });
    }
    async deleteRelUserProjeto(user_id: number, projeto_id: number): Promise<void> {
        const user = await this.userRepo.findOne({
            where: { user_id },
            relations: ['projetos']
        })

        user.projetos = user.projetos.filter(projeto => projeto.proj_id != projeto_id)

        await this.userRepo.save(user)
    }

async restoreProjeto(proj_id: number): Promise<Projeto> {
    const projeto = await this.projRepo.findOne({
        where: { proj_id }
    });
    
    if (!projeto) {
        throw new Error(`Projeto com ID ${proj_id} não encontrado`);
    }
    
    projeto.proj_excluido = false;
    try {
        return await this.projRepo.save(projeto);
    } catch (error) {
        console.error('Erro ao salvar projeto:', error);
        throw error;
    }
}
}