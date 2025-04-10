import { Request, Response } from "express";
import { Subtarefa_UserService } from "../services/subtarefa_userService";



export class Subtarefa_UserController{
    
    private subtarefa_userService = new Subtarefa_UserService()


    constructor(){
        this.subtarefa_userService = new Subtarefa_UserService()

        this.associateSubtarefaUsuarioControl = this.associateSubtarefaUsuarioControl.bind(this);
        this.removeSubTarefaUsuarioControl = this.removeSubTarefaUsuarioControl.bind(this);
        this.getSubtarefasUsuarioControl = this.getSubtarefasUsuarioControl.bind(this)
    }




    async getSubtarefasUsuarioControl(req:Request, res:Response):Promise<void>{

        try{

            const {user_id} = req.params
            const service = await this.subtarefa_userService.getSubtarefasUsuario(Number(user_id))
            res.status(200).json(service)
        }catch(error){
            res.status(400).json({message: error.message})
        }
    }


    async associateSubtarefaUsuarioControl(req:Request, res:Response):Promise<void>{

        try{

            const {user_id, subtarefa_id} = req.body
            const service = await this.subtarefa_userService.associateSubtarefaUsuario(subtarefa_id, user_id)
            res.status(200).json(service)
        }catch(error){
            res.status(400).json({message: error.message})
        }
    }


    async removeSubTarefaUsuarioControl(req:Request, res:Response):Promise<void>{

        try{

            const {user_id, subtarefa_id} = req.body
            const service = await this.subtarefa_userService.removeSubTarefaUsuario(subtarefa_id, user_id)
            res.status(200).json(service)
        }catch(error){
            res.status(400).json({message: error.message})
        }
    }
}