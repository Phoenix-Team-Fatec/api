import { Tarefa } from "../entities/Tarefa";
import { Usuario } from "../entities/Usuario";
import { AppDataSource } from "../../ormconfig";


export class TarefaService{

    private tarefaRepository = AppDataSource.getRepository(Tarefa)
    

    //função para criar uma tarefa
    async createTarefa(tarefa_nome:string, tarefa_descricao:string, tarefa_data_inicio:Date, tarefa_data_fim:Date, tarefa_status: boolean, etapa_id:number):Promise<Tarefa>{

        const tarefa = this.tarefaRepository.create({tarefa_nome, tarefa_descricao, tarefa_data_inicio, tarefa_data_fim, tarefa_status, etapa:{etapa_id} })

        return await this.tarefaRepository.save(tarefa)
    }

    //função para atualizar uma tarefa
    async updateTarefa(tarefa_id:number,tarefa_nome?:string, tarefa_descricao?:string, tarefa_data_inicio?:Date, tarefa_data_fim?:Date, tarefa_status?: boolean, etapa_id?:number):Promise<Tarefa>{

        const tarefa = await this.tarefaRepository.findOne({
            where: {tarefa_id}, 
            relations:["etapa"]
        })

        if(tarefa){
            tarefa.tarefa_nome = tarefa_nome
            tarefa.tarefa_descricao = tarefa_descricao
            tarefa.tarefa_data_inicio = tarefa_data_inicio
            tarefa.tarefa_data_fim = tarefa_data_fim
            tarefa.tarefa_status = tarefa_status
            tarefa.etapa.etapa_id = etapa_id
        }

        return await this.tarefaRepository.save(tarefa)
    }



    //função para pegar tarefas em uma etapa
    async getTarefasByEtapa(etapa_id:number):Promise<Tarefa[]>{

        if(etapa_id){
            return await this.tarefaRepository.find({
                where: {
                    etapa: {etapa_id},
                },
                relations:['usuarios']
            });
        }
    }


    //função para pegar uma tarefa
    async getTarefa(tarefa_id:number):Promise<Tarefa[]>{

        if(tarefa_id){
            return await this.tarefaRepository.find({
                where: {
                    tarefa_id: tarefa_id,
                },
                relations:['usuarios']
            });
        }
    }


    async deleteTarefa(tarefa_id: number): Promise<void> {
        const tarefa = await this.tarefaRepository.findOne({
            where: { tarefa_id },
            relations: ["usuarios", "subtarefas"]
        });

        if (!tarefa) {
            throw new Error("Tarefa não encontrada");
        }

        await AppDataSource.manager.transaction(async (transactionalEntityManager) => {

            if (tarefa.usuarios && tarefa.usuarios.length > 0) {
                for (const usuario of tarefa.usuarios) {
                    await this.removeUserFromTask(tarefa_id, usuario.user_id, transactionalEntityManager);
                }
            }
            if (tarefa.subtarefas && tarefa.subtarefas.length > 0) {
                await transactionalEntityManager.remove(tarefa.subtarefas);
            }
            await transactionalEntityManager.remove(tarefa);
        });
    }

    private async removeUserFromTask(
        tarefa_id: number,
        user_id: number,
        transactionalEntityManager = AppDataSource.manager
    ): Promise<void> {
        const usuario = await transactionalEntityManager.findOne(Usuario, {
            where: { user_id },
            relations: ["tarefas"]
        });

        if (!usuario) return;

        usuario.tarefas = usuario.tarefas.filter(t => t.tarefa_id !== tarefa_id);
        await transactionalEntityManager.save(usuario);
    }
}