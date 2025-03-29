import { Request, Response } from "express";
import { RelUserProjetoService } from "../services/RelUserProjetoService";

export class RelUserProjetoController {
    private service: RelUserProjetoService

    constructor(){
        this.service = new RelUserProjetoService()

        this.createRelUserProjeto = this.createRelUserProjeto.bind(this)
        this.getRelUserProjetoByUser = this.getRelUserProjetoByUser.bind(this)
        this.getRelUserProjetoByProjeto = this.getRelUserProjetoByProjeto.bind(this)
        this.deleteRelUserProjeto = this.deleteRelUserProjeto.bind(this)
    }

    async createRelUserProjeto(req: Request, res: Response){
        const { user_id, proj_id, coordenador } = req.body

        try {
            console.log(user_id, proj_id, coordenador)
            const relation = await this.service.createRelUserProjeto(Number(user_id), Number(proj_id), Boolean(coordenador))
            res.status(201).json(relation)
        } catch (error) {
            res.status(500).json({error: 'Erro ao criar RelUserProjeto', details: error})
        }
    }

    async getRelUserProjetoByUser(req: Request, res: Response){
        const user_id = Number(req.params.user_id)

        try {
            const projects = await this.service.getRelUserProjetoByUser(user_id)
            res.status(200).json(projects)
        } catch (error) {
            res.status(500).json({error: `Erro ao filtrar projetos pelo Usuário ${user_id}`, details: error})
        }
    }

    async getRelUserProjetoByProjeto(req: Request, res: Response){
        const proj_id = Number(req.params.proj_id)

        try {
            const users = await this.service.getRelUserProjetoByProjeto(proj_id)
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({errors: `Erro ao filtrar usuários pelo Projeto ${proj_id}`, details: error})
        }
    }

    async deleteRelUserProjeto(req: Request, res: Response){
        const { user_id, proj_id } = req.body

        try {
            await this.service.deleteRelUserProjeto(Number(user_id), Number(proj_id))
            return res.status(200).json('Relação excluída com sucesso')
        } catch (error) {
            return res.status(500).json({error: 'Erro ao deletar relação', details: error})
        }
    }
}