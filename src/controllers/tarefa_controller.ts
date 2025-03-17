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

    async associateTarefaToEtapaControl(req:Request, res:Response):Promise<void>{

        try{

            const{tarefa_id, etapa_id} = req.body;
            const tarefa = await this.tarefaService.associateTarefaToEtapa(tarefa_id, etapa_id)
            res.status(201).jso

        }catch(error){
            res.status(400).json({message: error.message})

        }
    }


    async getTarefasControl(req:Request, res:Response):Promise<void>{

        try{
            const{etapa_id} = req.body
            const tarefa = await this.tarefaService.getTarefas(etapa_id)
            res.status(201).jso

        }catch(error){
            res.status(400).json({message: error.message})

        }
    }


    async deleteTarefaControl(req:Request, res:Response):Promise<void>{

        try{
            
            const{id} = req.params
            const tarefa = await this.tarefaService.deleteTarefa(id)
            res.status(201).jso

        }catch(error:any){
            res.status(400).json({message: error.message})
            }
    }


  
}