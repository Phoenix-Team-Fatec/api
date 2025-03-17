import{Request, Response} from "express";
import { TarefaService } from "../services/tarefas_service";


export class TarefaController{

    private tarefaService = new TarefaService()


    constructor() {
        this.tarefaService = new TarefaService();

        // Vincular o contexto dos métodos ao 'this' da classe
        this.createTarefaControl = this.createTarefaControl.bind(this);
        this.updateTarefaControl = this.updateTarefaControl.bind(this);
        this.getTarefasControl = this.getTarefasControl.bind(this);
        this.deleteTarefaControl = this.deleteTarefaControl.bind(this);
        this.associateTarefaUsuarioControl = this.associateTarefaUsuarioControl.bind(this);
        this.removeTarefaUsuarioControl = this.removeTarefaUsuarioControl.bind(this);
    }


    //função para criar uma tarefa
    async createTarefaControl(req:Request, res:Response):Promise<void>{
        try{
            
            const{nome, descricao, data_inicio, data_fim, tarefa_status, etapa_id} = req.body;
            const tarefa = await this.tarefaService.createTarefa(nome, descricao, data_inicio, data_fim, tarefa_status, etapa_id)
            res.status(201).json(tarefa)


        }catch(error:any){
            res.status(400).json({message: error.message})
        }
    }

    async updateTarefaControl(req:Request, res:Response):Promise<void>{

        try{

            const{id, nome, descricao, data_inicio, data_fim, tarefa_status, etapa_id} = req.body;
            const tarefa = await this.tarefaService.updateTarefa(id, nome, descricao, data_inicio, data_fim, tarefa_status, etapa_id)
            res.status(201).json(tarefa)

        }catch(error:any){
            res.status(400).json({message: error.message})

        }
    }

   

    async getTarefasControl(req:Request, res:Response):Promise<void>{

        try{
            const{etapa_id} = req.body
            const tarefa = await this.tarefaService.getTarefas(etapa_id)
            res.status(201).json(tarefa)

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


    async associateTarefaUsuarioControl(req:Request, res:Response):Promise<void>{

        try{

            const{tarefa_id, usuario_id} = req.body
            const tarefa_usuario = await this.tarefaService.associateTarefaUsuario(tarefa_id, usuario_id)
            res.status(201).json(tarefa_usuario)

        }catch(error:any){
            res.status(400).json({message: error.message})

        }
    }

    async removeTarefaUsuarioControl(req:Request, res:Response):Promise<void>{

        try{

            const{tarefa_id, usuario_id} = req.body
            const tarefa_usuario = await this.tarefaService.removeTarefaUsuario(tarefa_id, usuario_id)
            res.status(201).json(tarefa_usuario)

        }catch(error:any){
            res.status(400).json({message: error.message})

        }
    }


    


  
}