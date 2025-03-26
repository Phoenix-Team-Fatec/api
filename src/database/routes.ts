import { Router } from "express";
import { createUsuario, deleteUsuario, getUsuarioById, getUsuarios, loginUsuario, resetPassword, updateUsuario } from "./controllers/UsuarioController";
import { TarefaController } from "./controllers/tarefa_controller";
import { TarefaUsuarioController } from "./controllers/tarefa_usuarioController";
import { ProjetoController } from "./controllers/ProjetoController";
import { RelUserProjetoController } from "./controllers/RelUserProjetoController";
import { AreaAtuacaoController } from "./controllers/areaAtuacaoController";

const routes = Router();
const tarefa = new TarefaController()
const tarefa_user = new TarefaUsuarioController()
const projeto = new ProjetoController()
const relUserProj = new RelUserProjetoController()
const area_atuacao = new AreaAtuacaoController()

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

//REL_USER_PROJETO
routes.post('/relUserProj', relUserProj.createRelUserProjeto)
routes.get('/relUserProj/getProjs/:user_id', relUserProj.getRelUserProjetoByUser)
routes.get('/relUserProj/getUsers/:proj_id', relUserProj.getRelUserProjetoByProjeto)
routes.delete('/relUserProj', relUserProj.deleteRelUserProjeto)

//TAREFAS
routes.post("/tarefa", tarefa.createTarefaControl);
routes.put("/tarefa", tarefa.updateTarefaControl);
routes.get("/tarefa/:etapa_id", tarefa.getTarefasControl);

//TAREFAS_USUARIO
routes.post("/tarefa_usuario/associate", tarefa_user.associateTarefaUsuarioControl)
routes.post("/tarefa_usuario/remove_usuario", tarefa_user.removeTarefaUsuarioControl)
routes.get("/tarefa_usuario/:usuario_id", tarefa_user.getTarefaUsuarioControl)

//AREAS DE ATUAÇÃO
routes.post("/area_atuacao", area_atuacao.createAreaAtuacaoControl);
routes.put("/area_atuacao", area_atuacao.updateAreaAtuacaoControl);
routes.get("/area_atuacao", area_atuacao.getAreaAtuacaoControl);
routes.get("/area_atuacao/projeto/:proj_id", area_atuacao.getAreaAtuacaoByProjetoIdControl);
routes.delete("/area_atuacao/:area_atuacao_id", area_atuacao.getAreaAtuacaoControl);



export { routes };