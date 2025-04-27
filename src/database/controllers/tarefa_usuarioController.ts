
import { TarefaUsuarioService } from "../services/tarefa_usuarioService";
import { Request, Response } from "express";

export class TarefaUsuarioController {

    private tarefa_usuarioService = new TarefaUsuarioService()

    constructor() {
        this.tarefa_usuarioService = new TarefaUsuarioService()

        this.associateTarefaUsuarioControl = this.associateTarefaUsuarioControl.bind(this);
        this.removeTarefaUsuarioControl = this.removeTarefaUsuarioControl.bind(this);
        this.getTarefaUsuarioControl = this.getTarefaUsuarioControl.bind(this);
        this.getUsuarioTarefaControl = this.getUsuarioTarefaControl.bind(this);
        this.deleteUsuarioTarefaControl = this.deleteUsuarioTarefaControl.bind(this);

    }


    async associateTarefaUsuarioControl(req: Request, res: Response): Promise<void> {

        try {

            const { tarefa_id, user_id } = req.body

            const tarefa_usuario = await this.tarefa_usuarioService.associateTarefaUsuario(tarefa_id, user_id)
            res.status(201).json(tarefa_usuario)

        } catch (error: any) {
            res.status(400).json({ message: error.message })

        }
    }

    async removeTarefaUsuarioControl(req: Request, res: Response): Promise<void> {

        try {

            const { tarefa_id, usuario_id } = req.body
            const tarefa_usuario = await this.tarefa_usuarioService.removeTarefaUsuario(tarefa_id, usuario_id)
            res.status(201).json(tarefa_usuario)

        } catch (error: any) {
            res.status(400).json({ message: error.message })

        }
    }


    async getTarefaUsuarioControl(req: Request, res: Response): Promise<void> {

        try {
            const { usuario_id } = req.params
            const tarefa_usuario = await this.tarefa_usuarioService.getTarefaUsuario(Number(usuario_id))
            res.status(201).json(tarefa_usuario)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    async getUsuarioTarefaControl(req: Request, res: Response): Promise<void> {
        try {
            const { tarefa_id } = req.params
            const usuario_tarefa = await this.tarefa_usuarioService.getUsuarioTarefa(Number(tarefa_id))
            res.status(201).json(usuario_tarefa)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    async deleteUsuarioTarefaControl(req: Request, res: Response): Promise<void> {
        try {
            const { tarefa_id, usuario_id } = req.params
            const usuario_tarefa = await this.tarefa_usuarioService.deleteUsuarioTarefa(Number(tarefa_id), Number(usuario_id))
            res.status(201).json(usuario_tarefa)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
}