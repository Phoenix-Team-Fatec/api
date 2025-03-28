import { ProjetoService } from "../services/ProjetoService"
import { Request, Response } from "express"


export class ProjetoController{
    private service: ProjetoService

    constructor(){
        this.service = new ProjetoService()

        this.createProjeto = this.createProjeto.bind(this)
        this.getAllProjeto = this.getAllProjeto.bind(this)
        this.getProjetoById = this.getProjetoById.bind(this)
        this.updateProjeto = this.updateProjeto.bind(this)
        this.deleteProjeto = this.deleteProjeto.bind(this)
    }

    async createProjeto(req: Request, res: Response): Promise<Response>{
        const date = new Date()
        const [day, month, year] = req.body.proj_data_fim.split('/')
        
        const new_data = {
            ...req.body,
            proj_data_inicio: date,
            proj_data_fim: new Date(year, month-1, day),
            proj_excluido: false,
            proj_status: 0
        }
        try {
            const project = await this.service.createProjeto(new_data)
            return res.status(201).json(project)

        } catch (error) {
            return res.status(500).json({error: "Erro ao criar projeto", details: error})
        }
    }

    async getAllProjeto(req: Request, res: Response): Promise<Response>{
        try{
            const projects = await this.service.getAllProjeto()
            return res.status(200).json(projects)

        } catch(error){
            return res.status(500).json({error: "Erro ao buscar todos os projetos", details: error})
        }
    }

    async getProjetoById(req: Request, res: Response): Promise<Response>{
        const id = Number(req.params.id)

        try {
            const project = await this.service.getProjetoById(id)
            return res.status(200).json(project)

        } catch (error) {
            return res.status(500).json({error: `Erro ao procurar usuario de id: ${id}`, details: error})
        }
    }

    async updateProjeto(req: Request, res: Response): Promise<Response>{
        const id = Number(req.params.id)
        
        try {
            const updatedProject = await this.service.updateProjeto(id, req.body)
            return res.status(200).json(updatedProject)

        } catch (error) {
            res.status(500).json({error: 'Erro ao atualizar o usuário', details: error})
        }
    }
    
    async deleteProjeto(req: Request, res: Response): Promise<Response>{
        const id = Number(req.params.id)

        try {
            const deletedProject = await this.service.deleteProjeto(id)
            return res.status(200).json(deletedProject)

        } catch (error) {
            return res.status(500).json({error: `Erro ao deletar projeto ${id}`, details: error})
        }
    }
}