import { Router } from "express";
import { EtapaController } from "../controllers/etapa_controller";

const etapaRoutes = Router();
const etapaController = new EtapaController();

// Criar uma etapa
etapaRoutes.post("/etapas", (req, res) => etapaController.createEtapaControl(req, res));

// Atualizar uma etapa
etapaRoutes.put("/etapas", (req, res) => etapaController.updateEtapaControl(req, res));

// Remover uma etapa pelo ID
etapaRoutes.delete("/etapas/:etapaId", (req, res) => etapaController.deleteEtapaControl(req, res));

// Listar todas as etapas (VERIFIQUE SE ESSE TRECHO EXISTE)
etapaRoutes.get("/etapas/:proj_id", async (req, res) => {
    try {
        const etapas = await etapaController.getAllEtapas(req, res);
        res.status(200).json(etapas);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Atribuir usuário a uma etapa
etapaRoutes.post("/etapas/assign", (req, res) => etapaController.assignUserToEtapaControl(req, res));

// Remover usuário de uma etapa
etapaRoutes.delete("/etapas/remove", (req, res) => etapaController.removeUserFromEtapaControl(req, res));

export { etapaRoutes };
