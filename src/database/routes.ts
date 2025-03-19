import { Router } from "express";
import { createUsuario, deleteUsuario, getUsuarioById, getUsuarios, loginUsuario, resetPassword, updateUsuario } from "./controllers/UsuarioController";
import { TarefaController } from "./controllers/tarefa_controller";
import { TarefaUsuarioController } from "./controllers/tarefa_usuarioController";
import { ProjetoController } from "./controllers/ProjetoController";

const routes = Router();
const tarefa = new TarefaController()
const tarefa_user = new TarefaUsuarioController()
const projeto = new ProjetoController()

//USUARIO
routes.post("/usuarios", createUsuario);
routes.post("/usuarios/login", loginUsuario);
routes.post("/usuarios/reset-password", resetPassword);
routes.get("/usuarios", getUsuarios);
routes.get("/usuarios/:id", getUsuarioById);
routes.put("/usuarios/:id", updateUsuario);
routes.delete("/usuarios/:id", deleteUsuario);

//PROJETO
routes.post('/projeto', projeto.createProjeto)
routes.get('/projeto/getAll', projeto.getAllProjeto)
routes.get('/projeto/getById/:id', projeto.getProjetoById)
routes.put('/projeto/update/:id', projeto.updateProjeto)
routes.put('/projeto/delete/:id', projeto.deleteProjeto)

//TAREFAS
routes.post("/tarefa", tarefa.createTarefaControl);
routes.put("/tarefa", tarefa.updateTarefaControl);
routes.get("/tarefa/:etapa_id", tarefa.getTarefasControl);

//TAREFAS_USUARIO
routes.post("/tarefa_usuario/associate", tarefa_user.associateTarefaUsuarioControl)
routes.post("/tarefa_usuario/remove_usuario", tarefa_user.removeTarefaUsuarioControl)
routes.get("/tarefa_usuario/:usuario_id", tarefa_user.getTarefaUsuarioControl)

export { routes };