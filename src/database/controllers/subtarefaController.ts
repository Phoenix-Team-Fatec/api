import { Request, Response } from "express";
import { SubtarefaService } from "../services/subtarefaService";


export class SubtarefaController{


    private subtarefaService = new SubtarefaService()

    constructor(){

        this.subtarefaService = new SubtarefaService()

        this.createSubtarefaControl = this.createSubtarefaControl.bind(this);
        this.updateSubtarefaControl = this.updateSubtarefaControl.bind(this);
        this.getOneSubtarefaControl = this.getOneSubtarefaControl.bind(this);
        this.getSubtarefasControl = this.getSubtarefasControl.bind(this);
        this.deleteSubtarefaControl = this.deleteSubtarefaControl.bind(this);

    }



    async createSubtarefaControl(req:Request, res:Response):Promise<void>{

        try{
            
            const{nome, descricao, data_inicio, data_fim, subtarefa_status, tarefa_id} = req.body;
            const subtarefa = this.subtarefaService.createSubtarefa(nome, descricao, data_inicio, data_fim, subtarefa_status, tarefa_id)
            res.status(201).json(subtarefa)
        }catch(error:any){
            res.status(400).json({message: error.message})

        }

    }


    async getOneSubtarefaControl(req:Request, res:Response):Promise<void>{

        try{

            const {subtarefa_id} = req.params
            const subtarefa = this.subtarefaService.getOneSubtarefa(Number(subtarefa_id))
            res.status(201).json(subtarefa)
         }catch(error){
            res.status(400).json({message: error.message})
            
        }
    }

    async getSubtarefasControl(req:Request, res:Response):Promise<void>{

        try{
            const {tarefa_id} = req.params
            const subtarefas = this.subtarefaService.getSubtarefas(Number(tarefa_id))
            res.status(201).json(subtarefas)
        }catch(error){
            res.status(400).json({message: error.message})
        }
    }


    async updateSubtarefaControl(req:Request, res:Response):Promise<void>{

        try{
            const{subtarefa_id,nome, descricao, data_inicio, data_fim, subtarefa_status, tarefa_id} = req.body;
            const subtarefa = this.subtarefaService.updateSubtarefa(subtarefa_id,nome, descricao, data_inicio, data_fim, subtarefa_status, tarefa_id)
            res.status(201).json(subtarefa)
        }catch(error){
            res.status(400).json({message: error.message})
        }

    }


    async deleteSubtarefaControl(req:Request, res:Response):Promise<void>{

        try{
            const{subtarefa_id} = req.params
            const subtarefa = this.subtarefaService.deleteSubtarefa(Number(subtarefa_id))
            res.status(201).json(subtarefa)
        }catch(error){
            res.status(400).json({message: error.message})
        }
    }

}
