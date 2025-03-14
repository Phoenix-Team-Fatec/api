import{Request, Response} from "express";
import { TarefaService } from "../services/tarefas_service";


export class TarefaController{

    private tarefaService = new TarefaService()


    //função para criar uma tarefa
    async createTarefaControl(req:Request, res:Response):Promise<void>{
        try{
            
            const{nome, descricao, data_inicio, data_fim, tarefa_status} = req.body;
            const tarefa = await this.tarefaService.createTarefa(nome, descricao, data_inicio, data_fim, tarefa_status)
            res.status(201).json(tarefa)


        }catch(error:any){
            res.status(400).json({message: error.message})
        }
    }

    async updateTarefaControl(req:Request, res:Response):Promise<void>{

        try{

            const{id, nome, descricao, data_inicio, data_fim, tarefa_status} = req.body;
            const tarefa = await this.tarefaService.updateTarefa(id, nome, descricao, data_inicio, data_fim, tarefa_status)
            res.status(201).json(tarefa)

        }catch(error:any){
            res.status(400).json({message: error.message})

        }
    }
}