import { Tarefa } from "../database/entities/Tarefa";
import { AppDataSource } from "../ormconfig";



export class TarefaService{

    private tarefaRepository = AppDataSource.getRepository(Tarefa)

    //função para criar uma tarefa
    async createTarefa(tarefa_nome:string, tarefa_descricao:string, tarefa_data_inicio:Date, tarefa_data_fim:Date, tarefa_status: boolean):Promise<Tarefa>{

        const tarefa = this.tarefaRepository.create({tarefa_nome, tarefa_descricao, tarefa_data_inicio, tarefa_data_fim, tarefa_status })

        return await this.tarefaRepository.save(tarefa)
    }

    //função para atualizar uma tarefa
    async updateTarefa(tarefa_id:number,tarefa_nome?:string, tarefa_descricao?:string, tarefa_data_inicio?:Date, tarefa_data_fim?:Date, tarefa_status?: boolean):Promise<Tarefa>{

        const tarefa = await this.tarefaRepository.findOneBy({tarefa_id})

        if(tarefa){
            tarefa.tarefa_nome = tarefa_nome
            tarefa.tarefa_descricao = tarefa_descricao
            tarefa.tarefa_data_inicio = tarefa_data_inicio
            tarefa.tarefa_data_fim = tarefa_data_fim
            tarefa.tarefa_status = tarefa_status
        }

        return await this.tarefaRepository.save(tarefa)
    }



    




}