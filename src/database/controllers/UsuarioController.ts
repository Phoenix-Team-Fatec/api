import { Request, Response } from "express";
import { admin, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "../conifg/firebase.cjs"
import { UsuarioService } from "../services/UsuarioService";

const usuarioService = new UsuarioService();

export const createUsuario = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { user_email, password } = req.body;

        const existingUser = await usuarioService.getUsuarioByEmail(user_email);
        if (existingUser) {
            return res.status(400).json({ error: "Já existe um usuário com esse email" });
        }

        const usuario = await usuarioService.createUsuario(req.body);

        await createUserWithEmailAndPassword(getAuth(), user_email, password);

        return res.status(201).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar usuário", details: error });
    }
};

export const loginUsuario = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { user_email, password } = req.body;

        const userCredential = await signInWithEmailAndPassword(getAuth(), user_email, password);

        return res.status(200).json({
            message: "Login efetuado com sucesso",
            user: userCredential.user,
        });
    } catch (error) {
        return res.status(401).json({
            error: "Falha no login",
            details: error,
        });
    }
};

export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { user_email } = req.body;

        const existingUser = await usuarioService.getUsuarioByEmail(user_email);
        if (!existingUser) {
            return res.status(400).json({ error: "User not found" });
        }

        await sendPasswordResetEmail(getAuth(), user_email);

        return res.status(200).json("Email para reset de senha enviado com sucesso");
    } catch (error) {
        return res.status(500).json("Erro ao enviar email de reset de senha");
    }
};

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

        const usuario = await usuarioService.getUsuarioById(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const userRecord = await admin.auth().getUserByEmail(usuario.user_email);
        const user_id = userRecord.uid;
        await admin.auth().deleteUser(user_id);

        await usuarioService.deleteUsuario(id);
        return res.status(204).json("Usuário deletado com sucesso");
    } catch (error) {
        return res.status(500).json({ error: "Erro ao deletar usuário", details: error });
    }
};