import { Router } from "express";
import { createUsuario, deleteUsuario, getUsuarioById, getUsuarios, loginUsuario, resetPassword, updateUsuario } from "./controllers/UsuarioController";
import { TarefaController } from "./controllers/tarefa_controller";

const routes = Router();
const tarefa = new TarefaController()

//USUARIO
routes.post("/usuarios", createUsuario);
routes.post("/usuarios/login", loginUsuario);
routes.post("/usuarios/reset-password", resetPassword);
routes.get("/usuarios", getUsuarios);
routes.get("/usuarios/:id", getUsuarioById);
routes.put("/usuarios/:id", updateUsuario);
routes.delete("/usuarios/:id", deleteUsuario);


//TAREFAS
routes.post("/tarefa", tarefa.createTarefaControl);
routes.put("/tarefa/update", tarefa.updateTarefaControl);
routes.get("/tarefa", tarefa.getTarefasControl);
routes.post("/tarefa/associate", tarefa.associateTarefaUsuarioControl)
routes.post("/tarefa/remove_usuario", tarefa.removeTarefaUsuarioControl)



export { routes };