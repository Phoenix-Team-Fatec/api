import { Repository } from "typeorm";
import { AppDataSource } from "../../ormconfig";
import { Subtarefa } from "../entities/Subtarefa";
import { Tarefa } from "../entities/Tarefa";



export class SubtarefaService{

    private subtarefaRepo: Repository<Subtarefa>
    // private tarefaRepo: Repository<Tarefa>

    constructor(){
        this.subtarefaRepo = AppDataSource.getRepository(Subtarefa)
        // this.tarefaRepo = AppDataSource.getRepository(Tarefa)
    }


    //função para criar uma subtarefa
    async createSubtarefa(subtarefa_nome:string, subtarefa_descricao:string, subtarefa_data_inicio:Date, subtarefa_data_fim:Date, subtarefa_status:boolean, tarefa_id:number):Promise<Subtarefa>{

        const subtarefa = this.subtarefaRepo.create({subtarefa_nome, subtarefa_descricao, subtarefa_data_inicio, subtarefa_status,subtarefa_data_fim, tarefa:{tarefa_id}})

        return await this.subtarefaRepo.save(subtarefa)

    }

    //função para pegar uma subtarefa
    async getOneSubtarefa(subtarefa_id:number):Promise<Subtarefa>{

        const subtarefa = await this.subtarefaRepo.findOneBy({subtarefa_id})

        if (subtarefa){
            return subtarefa
        }
    }


    //função para pegar subtarefas
    async getSubtarefas(tarefa_id:number):Promise<Subtarefa[]>{

        const subtarefas = await this.subtarefaRepo.find({
            where:{tarefa:{tarefa_id}},
        })

        

        if (subtarefas){
            return subtarefas
        }
    }

    //função para editar uma subtarefa
    async updateSubtarefa(subtarefa_id:number,subtarefa_nome?:string, subtarefa_descricao?:string, subtarefa_data_inicio?:Date, subtarefa_data_fim?:Date, subtarefa_status?:boolean, tarefa_id?:number):Promise<Subtarefa>{

        const subtarefa = await this.subtarefaRepo.findOne({
            where:{subtarefa_id},
            relations:['tarefa']
        })

        if (subtarefa){
            subtarefa.subtarefa_nome = subtarefa_nome
            subtarefa.subtarefa_descricao = subtarefa_descricao
            subtarefa.subtarefa_data_inicio = subtarefa_data_inicio
            subtarefa.subtarefa_data_fim = subtarefa_data_fim
            subtarefa.subtarefa_status = subtarefa_status
            subtarefa.tarefa.tarefa_id = tarefa_id
        }

        return await this.subtarefaRepo.save(subtarefa)
    }


    //função para deletar uma subtarefa
    async deleteSubtarefa(subtarefa_id:number):Promise<Subtarefa>{

        const subtarefa = await this.subtarefaRepo.findOne({where:{subtarefa_id}})

        if (subtarefa_id){
            return await this.subtarefaRepo.remove(subtarefa)
        }
    }
}