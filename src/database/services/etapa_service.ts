import { AppDataSource } from "../../ormconfig";
import { Etapa } from "../entities/Etapa";
import { Usuario } from "../entities/Usuario";
import { Repository } from "typeorm";
import { Tarefa } from "../entities/Tarefa";
export class EtapaService {
    private etapaRepository: Repository<Etapa>;
    private usuarioRepository: Repository<Usuario>;
    

    constructor() {
        this.etapaRepository = AppDataSource.getRepository(Etapa);
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
    }

    // Criar uma etapa
    async createEtapa(
        etapaNome: string,
        etapaDescricao: string,
        etapaDataInicio: Date,
        etapaDataFim: Date | null,
        etapaStatus: boolean,
        projId: number
    ): Promise<Etapa> {
        const etapa = this.etapaRepository.create({
            etapa_nome: etapaNome,
            etapa_descricao: etapaDescricao,
            etapa_data_inicio: etapaDataInicio,
            etapa_data_fim: etapaDataFim,
            etapa_status: etapaStatus,
            projeto: { proj_id: projId }
        });

        return await this.etapaRepository.save(etapa);
    }

    // Atualizar uma etapa
    async updateEtapa(
        etapaId: number,
        etapaNome?: string,
        etapaDescricao?: string | null,
        etapaDataInicio?: Date,
        etapaDataFim?: Date,
        etapaStatus?: boolean
    ): Promise<Etapa> {
        const etapa = await this.etapaRepository.findOneBy({ etapa_id: etapaId });

        if (!etapa) {
            throw new Error("Etapa não encontrada");
        }

        if (etapaNome) etapa.etapa_nome = etapaNome;
        if (etapaDescricao !== undefined) etapa.etapa_descricao = etapaDescricao;
        if (etapaDataInicio) etapa.etapa_data_inicio = etapaDataInicio;
        if (etapaDataFim) etapa.etapa_data_fim = etapaDataFim;
        if (etapaStatus !== undefined) etapa.etapa_status = etapaStatus;

        return await this.etapaRepository.save(etapa);
    }

    async getEtapaById(etapaId: number): Promise<Etapa> {
        const etapa = await this.etapaRepository.findOne({
            where: { etapa_id: etapaId },
            relations: ["projeto", "tarefas", "usuarios"]
        });
    
        if (!etapa) {
            throw new Error("Etapa não encontrada");
        }
    
        return etapa;
    }

    // Atribuir usuário a uma etapa
    async assignUserToEtapa(userId: number, etapaId: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { user_id: userId },
            relations: ["etapas"]
        });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        const etapa = await this.etapaRepository.findOne({ where: { etapa_id: etapaId } });

        if (!etapa) {
            throw new Error("Etapa não encontrada");
        }

        usuario.etapas.push(etapa);
        return await this.usuarioRepository.save(usuario);
    }

    // Remover usuário de uma etapa
    async removeUserFromEtapa(userId: number, etapaId: number): Promise<void> {
        const usuario = await this.usuarioRepository.findOne({
            where: { user_id: userId },
            relations: ["etapas"]
        });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        usuario.etapas = usuario.etapas.filter(etapa => etapa.etapa_id !== etapaId);
        await this.usuarioRepository.save(usuario);
    }

    async getAllEtapas(proj_id: number): Promise<Etapa[]> {
        return await this.etapaRepository.find({ 
            where: { projeto: { proj_id } },
            relations: ["tarefas", "usuarios"] 
        });
    }
    
    // Remover uma etapa pelo ID
    async deleteEtapa(etapaId: number): Promise<void> {
        const etapa = await this.etapaRepository.findOne({
            where: { etapa_id: etapaId },
            relations: ["tarefas", "tarefas.usuarios"], // carrega tarefas e usuários
        });
    
        if (!etapa) {
            throw new Error("Etapa não encontrada");
        }
    
        const tarefaRepository = AppDataSource.getRepository(Tarefa);
    
        if (etapa.tarefas.length > 0) {
            for (const tarefa of etapa.tarefas) {
                // 1º: Remove manualmente os vínculos da tabela de ligação (responsavel_user_tarefa)
                await AppDataSource
                    .createQueryBuilder()
                    .delete()
                    .from("responsavel_user_tarefa")
                    .where("tarefa_id = :tarefaId", { tarefaId: tarefa.tarefa_id })
                    .execute();
    
                // 2º: Agora pode remover a tarefa
                await tarefaRepository.remove(tarefa);
            }
        }
    
        // Por fim, remove a etapa
        await this.etapaRepository.remove(etapa);
    }    
}