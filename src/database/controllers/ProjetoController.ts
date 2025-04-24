import { AreaAtuacao } from "../entities/AreaAtuacao"
import { ProjetoService } from "../services/ProjetoService"
import { AreaAtuacaoService } from "../services/areaAtuacaoService"
import { Request, Response } from "express"


export class ProjetoController{
    private service: ProjetoService
    private areaAtuacaoService: AreaAtuacaoService

    constructor(){
        this.service = new ProjetoService()
        this.areaAtuacaoService = new AreaAtuacaoService()

        this.createProjeto = this.createProjeto.bind(this)
        this.getAllProjeto = this.getAllProjeto.bind(this)
        this.getProjetoById = this.getProjetoById.bind(this)
        this.updateProjeto = this.updateProjeto.bind(this)
        this.deleteProjeto = this.deleteProjeto.bind(this)
    }

    async createProjeto(req: Request, res: Response): Promise<Response>{
        const date = new Date()

        let area_atuacao = null

        if (req.body.area_atuacao_id){
            area_atuacao = await this.areaAtuacaoService.getAreaAtuacaoById(req.body.area_atuacao_id)
            if(!area_atuacao){
                return res.status(404).json({error:"Área de atuação não econtrada."})
            }
        }
        
        const new_data = {
            ...req.body,
            proj_data_inicio: date,
            proj_excluido: false,
            proj_status: 0,
            area_atuacao

        }
        try {
            const project = await this.service.createProjeto(new_data)
            console.log(new_data)
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
            return res.status(500).json({error: `Erro ao procurar projeto de id: ${id}`, details: error})
        }
    }

    async updateProjeto(req: Request, res: Response): Promise<Response>{
        const id = Number(req.params.id)
        
        try {

            let area_atuacao = null

            if(req.body.area_atuacao_id){
                area_atuacao = await this.areaAtuacaoService.getAreaAtuacaoById(req.body.area_atuacao_id)

                if(!area_atuacao){
                    return res.status(404).json({ error: "Área de atuação não encontrada" });
                }
            }   

            console.log(area_atuacao)

            const updateData = {
                ...req.body,
                area_atuacao
            }

            const updatedProject = await this.service.updateProjeto(id, updateData)
            return res.status(200).json(updatedProject)

        } catch (error) {
            res.status(500).json({error: 'Erro ao atualizar o projeto', details: error})
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