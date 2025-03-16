import { Router } from "express";
import { createUsuario, deleteUsuario, getUsuarioById, getUsuarios, loginUsuario, resetPassword, updateUsuario } from "./controllers/UsuarioController";
const routes = Router();

routes.post("/usuarios", createUsuario);
routes.post("/usuarios/login", loginUsuario);
routes.post("/usuarios/reset-password", resetPassword);
routes.get("/usuarios", getUsuarios);
routes.get("/usuarios/:id", getUsuarioById);
routes.put("/usuarios/:id", updateUsuario);
routes.delete("/usuarios/:id", deleteUsuario);

export { routes };