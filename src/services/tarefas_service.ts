import { NumericType } from "typeorm";
import { Tarefa } from "../database/entities/Tarefa";
import { AppDataSource } from "../ormconfig";



export class TarefaService{

    private tarefaRepository = AppDataSource.getRepository(Tarefa)

    //função para criar uma tarefa
    async createTarefa(tarefa_nome:string, tarefa_descricao:string, tarefa_data_inicio:Date, tarefa_data_fim:Date, tarefa_status: boolean, etapa_id:number):Promise<Tarefa>{

        const tarefa = this.tarefaRepository.create({tarefa_nome, tarefa_descricao, tarefa_data_inicio, tarefa_data_fim, tarefa_status, etapa:{etapa_id} })

        return await this.tarefaRepository.save(tarefa)
    }

    //função para atualizar uma tarefa
    async updateTarefa(tarefa_id:number,tarefa_nome?:string, tarefa_descricao?:string, tarefa_data_inicio?:Date, tarefa_data_fim?:Date, tarefa_status?: boolean, etapa_id?:number):Promise<Tarefa>{

        const tarefa = await this.tarefaRepository.findOneBy({tarefa_id})

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
    async getTarefas(etapa_id:number):Promise<Tarefa[]>{

        if(etapa_id){
            return await this.tarefaRepository.find({
                where: {
                    etapa: {etapa_id}
                }
            });
        }
    }


    //função para deletar uma tarefa
    async deleteTarefa(tarefa_id:number):Promise<Tarefa>{
        
        const tarefa = await this.tarefaRepository.findOneBy({tarefa_id})

        if(tarefa){
            return await this.tarefaRepository.remove(tarefa)
        }
    }




    




}