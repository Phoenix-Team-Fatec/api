import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";

const usuarioService = new UsuarioService();

export const createUsuario = async (req: Request, res: Response): Promise<Response> => {
    try {
        const usuario = await usuarioService.createUsuario(req.body);
        return res.status(201).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: "Error creating usuario", details: error });
    }
}

export const getUsuarios = async (req: Request, res: Response): Promise<Response> => {
    try {
        const usuarios = await usuarioService.getUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: "Error listing usuarios", details: error });
    }
}

export const getUsuarioById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.id);
        const usuario = await usuarioService.getUsuarioById(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario not found" });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: "Error fiding usuario", details: error });
    }
}

export const updateUsuario = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.id);
        const usuario = await usuarioService.updateUsuario(id, req.body);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario not found" });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: "Error updating usuario", details: error });
    }
}

export const deleteUsuario = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.id);
        await usuarioService.deleteUsuario(id);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: "Error delete usuario", details: error });
    }
}