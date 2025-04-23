import { Request, Response } from "express";
import { AreaAtuacaoService } from "../services/areaAtuacaoService";

export class AreaAtuacaoController{

    private areaAtuacaoService = new AreaAtuacaoService()


    constructor(){
        this.areaAtuacaoService = new AreaAtuacaoService()

        this.createAreaAtuacaoControl = this.createAreaAtuacaoControl.bind(this)
        this.deleteAreaAtuacaoControl = this.deleteAreaAtuacaoControl.bind(this)
        this.updateAreaAtuacaoControl = this.updateAreaAtuacaoControl.bind(this)
        this.getAreaAtuacaoControl = this.getAreaAtuacaoControl.bind(this)
        this.getAreaAtuacaoByProjetoIdControl = this.getAreaAtuacaoByProjetoIdControl.bind(this)
}


    async createAreaAtuacaoControl(req: Request, res:Response):Promise<void>{
        try{
            const{area_atuacao_nome} = req.body
            const area_atuacao = await this.areaAtuacaoService.createAreaAtuacao(area_atuacao_nome)
            res.status(200).json(area_atuacao)
        }catch(error:any){
            res.status(400).json({message: error.message});

        }
    }

    async deleteAreaAtuacaoControl(req:Request, res:Response):Promise<void>{
        try{
            const{area_atuacao_id} = req.params
            const area_atuacao = await this.areaAtuacaoService.deleteAreaAtuacao(Number(area_atuacao_id));
            res.status(200).json(area_atuacao);
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    async updateAreaAtuacaoControl(req:Request, res:Response):Promise<void>{
        try{
            const{area_atuacao_id, area_atuacao_nome} = req.body
            const area_atuacao = await this.areaAtuacaoService.updateAreaAtuacao(area_atuacao_id,area_atuacao_nome)
            res.status(200).json(area_atuacao);
        }catch(error:any){
            res.status(400).json({message: error.message});
         }
    }

    async getAreaAtuacaoControl(req:Request, res:Response):Promise<void>{
        try{
            const area_atuacao = await this.areaAtuacaoService.getAreaAtuacao()
            res.status(200).json(area_atuacao);
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

    async getAreaAtuacaoByProjetoIdControl(req:Request, res:Response):Promise<void>{
        try{
            const {proj_id} = req.params
            const area_atuacao = await this.areaAtuacaoService.getAreaAtuacaoByProjetoId(Number(proj_id))
            res.status(200).json(area_atuacao);
        }catch(error:any){
            res.status(400).json({message: error.message});
        }
    }

}