import { Tarefa } from "../database/entities/Tarefa";
import { AppDataSource } from "../ormconfig";



export class TarefaService{

    private tarefaRepository = AppDataSource.getRepository(Tarefa)

    //função para criar uma tarefa
    async createTarefa(tarefa_nome:string, tarefa_descricao:string, tarefa_data_inicio:Date, tarefa_data_fim:Date, status: boolean):Promise<Tarefa>{

        const tarefa = this.tarefaRepository.create({})
    }



}