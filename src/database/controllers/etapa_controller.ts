import { Request, Response } from "express";
import { EtapaService } from "../services/etapa_service";

export class EtapaController {
    private etapaService = new EtapaService();

    constructor(){
        this.etapaService = new EtapaService()

        this.assignUserToEtapaControl = this.assignUserToEtapaControl.bind(this)
        this.createEtapaControl = this.createEtapaControl.bind(this)
        this.deleteEtapaControl = this.deleteEtapaControl.bind(this)
        this.getAllEtapas = this.getAllEtapas.bind(this)
        this.removeUserFromEtapaControl = this.removeUserFromEtapaControl.bind(this)
        this.updateEtapaControl = this.updateEtapaControl.bind(this)
    }

    // Criar uma etapa
    async createEtapaControl(req: Request, res: Response): Promise<void> {
        try {
            const { etapaNome, etapaDescricao, etapaDataInicio, etapaDataFim, etapaStatus, projId } = req.body;
            const etapa = await this.etapaService.createEtapa(etapaNome, etapaDescricao, etapaDataInicio, etapaDataFim, etapaStatus, projId);
            res.status(201).json(etapa);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Atualizar uma etapa
    async updateEtapaControl(req: Request, res: Response): Promise<void> {
        try {
            const { etapaId, etapaNome, etapaDescricao, etapaDataInicio, etapaDataFim, etapaStatus } = req.body;
            const etapa = await this.etapaService.updateEtapa(etapaId, etapaNome, etapaDescricao, etapaDataInicio, etapaDataFim, etapaStatus);
            res.status(200).json(etapa);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Atribuir usuário a uma etapa
    async assignUserToEtapaControl(req: Request, res: Response): Promise<void> {
        try {
            const { userId, etapaId } = req.body;
            const usuario = await this.etapaService.assignUserToEtapa(userId, etapaId);
            res.status(201).json(usuario);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Remover usuário de uma etapa
    async removeUserFromEtapaControl(req: Request, res: Response): Promise<void> {
        try {
            const { userId, etapaId } = req.body;
            await this.etapaService.removeUserFromEtapa(userId, etapaId);
            res.status(200).json({ message: "Usuário removido da etapa com sucesso" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllEtapas(req: Request, res: Response): Promise<void> {
        try {
            const{proj_id} = req.params
            const etapas = await this.etapaService.getAllEtapas(Number(proj_id));
            res.status(200).json(etapas);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    // Remover uma etapa pelo ID
    async deleteEtapaControl(req: Request, res: Response): Promise<void> {
        try {
            const { etapaId } = req.params; // Obtém o ID da URL
            await this.etapaService.deleteEtapa(Number(etapaId));
            res.status(200).json({ message: "Etapa removida com sucesso" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    

    
}