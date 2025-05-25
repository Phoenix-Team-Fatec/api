import{Request, Response} from "express";
import { TarefaService } from "../services/tarefas_service";


export class TarefaController{

    private tarefaService = new TarefaService()


    constructor() {
        this.tarefaService = new TarefaService();

        // Vincular o contexto dos métodos ao 'this' da classe
        this.createTarefaControl = this.createTarefaControl.bind(this);
        this.updateTarefaControl = this.updateTarefaControl.bind(this);
        this.getTarefaByEtapaControl = this.getTarefaByEtapaControl.bind(this);
        this.getTarefaControl = this.getTarefaControl.bind(this);
        this.deleteTarefaControl = this.deleteTarefaControl.bind(this);
    }



    //função para criar uma tarefa
    async createTarefaControl(req:Request, res:Response):Promise<void>{
        try{
            
            const{nome, descricao, data_inicio, data_fim, tarefa_status, etapa_id, pontos_historias} = req.body;
            const tarefa = await this.tarefaService.createTarefa(nome, descricao, data_inicio, data_fim, tarefa_status, etapa_id, pontos_historias)
            res.status(200).json(tarefa)


        }catch(error:any){
            res.status(400).json({message: error.message})
        }
    }

    async updateTarefaControl(req:Request, res:Response):Promise<void>{

        try{

            const{id, nome, descricao, data_inicio, data_fim, tarefa_status, etapa_id, pontos_historias} = req.body;
            const tarefa = await this.tarefaService.updateTarefa(id, nome, descricao, data_inicio, data_fim, tarefa_status, etapa_id, pontos_historias)
            res.status(200).json(tarefa)

        }catch(error:any){
            res.status(400).json({message: error.message})

        }
    }

   

    async getTarefaByEtapaControl(req:Request, res:Response):Promise<void>{

        try{
            const {etapa_id} = req.params
            const tarefa = await this.tarefaService.getTarefasByEtapa(Number(etapa_id))
            res.status(200).json(tarefa)

        }catch(error){
            res.status(400).json({message: error.message})

        }
    }


    async getTarefaControl(req:Request, res:Response):Promise<void>{

        try{
            const {tarefa_id} = req.params
            const tarefa = await this.tarefaService.getTarefa(Number(tarefa_id))
            res.status(200).json(tarefa)

        }catch(error){
            res.status(400).json({message: error.message})

        }
    }



    async deleteTarefaControl(req:Request, res:Response):Promise<void>{

        try{
            
            const{tarefa_id} = req.params
            const tarefa = await this.tarefaService.deleteTarefa(Number(tarefa_id))
            res.status(201).json(tarefa)

        }catch(error:any){
            res.status(400).json({message: error.message})
            }
    }


    


    


  
}