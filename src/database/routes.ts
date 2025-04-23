import { Router } from "express";
import { uploadUserFoto } from "../middlewares/upload";
import { createUsuario, deleteUsuario, getUsuarioById, getUsuarios, loginUsuario, resetPassword, updateUsuario } from "./controllers/UsuarioController";
import { TarefaController } from "./controllers/tarefa_controller";
import { TarefaUsuarioController } from "./controllers/tarefa_usuarioController";
import { ProjetoController } from "./controllers/ProjetoController";
import { RelUserProjetoController } from "./controllers/RelUserProjetoController";
import { AreaAtuacaoController } from "./controllers/areaAtuacaoController";
import { EtapaController } from "./controllers/etapa_controller";
import { SubtarefaController } from "./controllers/subtarefaController";
import { Subtarefa_UserController } from "./controllers/subtarefa_userController";

const routes = Router();
const tarefa = new TarefaController()
const tarefa_user = new TarefaUsuarioController()
const projeto = new ProjetoController()
const relUserProj = new RelUserProjetoController()
const area_atuacao = new AreaAtuacaoController()
const etapaController = new EtapaController();
const subtarefa = new SubtarefaController();
const subtarefa_user = new Subtarefa_UserController();

//USUARIO
routes.post("/usuarios", uploadUserFoto, createUsuario);
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
routes.delete('/projeto/delete/:id', projeto.deleteProjeto)

//REL_USER_PROJETO
routes.post('/relUserProj', relUserProj.createRelUserProjeto)
routes.get('/relUserProj/getProjs/:user_id', relUserProj.getRelUserProjetoByUser)
routes.get('/relUserProj/getUsers/:proj_id', relUserProj.getRelUserProjetoByProjeto)
routes.delete('/relUserProj', relUserProj.deleteRelUserProjeto)

//ETAPAS
// Criar uma etapa
routes.post("/etapas", etapaController.createEtapaControl);

// Atualizar uma etapa
routes.put("/etapas", etapaController.updateEtapaControl);

// Remover uma etapa pelo ID
routes.delete("/etapas/:etapaId", etapaController.deleteEtapaControl);

// Listar todas as etapas (VERIFIQUE SE ESSE TRECHO EXISTE)
routes.get("/etapas/:proj_id", etapaController.getAllEtapas);

// Atribuir usuário a uma etapa
routes.post("/etapas/assign", etapaController.assignUserToEtapaControl);

// Remover usuário de uma etapa
routes.delete("/etapas/remove", etapaController.removeUserFromEtapaControl);


//TAREFAS
routes.post("/tarefa", tarefa.createTarefaControl);
routes.put("/tarefa", tarefa.updateTarefaControl);
routes.get("/tarefa/:etapa_id", tarefa.getTarefasControl);
routes.delete("/tarefa/:tarefa_id", tarefa.deleteTarefaControl)

//TAREFAS_USUARIO
routes.post("/tarefa_usuario/associate", tarefa_user.associateTarefaUsuarioControl)
routes.post("/tarefa_usuario/remove_usuario", tarefa_user.removeTarefaUsuarioControl)
routes.get("/tarefa_usuario/:usuario_id", tarefa_user.getTarefaUsuarioControl)

//AREAS DE ATUAÇÃO
routes.post("/area_atuacao", area_atuacao.createAreaAtuacaoControl);
routes.put("/area_atuacao", area_atuacao.updateAreaAtuacaoControl);
routes.get("/area_atuacao", area_atuacao.getAreaAtuacaoControl);
routes.get("/area_atuacao/projeto/:proj_id", area_atuacao.getAreaAtuacaoByProjetoIdControl);
routes.delete("/area_atuacao/:area_atuacao_id", area_atuacao.deleteAreaAtuacaoControl);


//SUBTAREFAS
routes.post("/subtarefa", subtarefa.createSubtarefaControl)
routes.get("/subtarefa/getOne/:subtarefa_id", subtarefa.getOneSubtarefaControl)
routes.get("/subtarefa/:tarefa_id", subtarefa.getSubtarefasControl)
routes.put("/subtarefa", subtarefa.updateSubtarefaControl)
routes.delete("/subtarefa/:subtarefa_id", subtarefa.deleteSubtarefaControl)


//SUBTAREFAS_USUARIO
routes.post("/subtarefa_usuario/associate", subtarefa_user.associateSubtarefaUsuarioControl)
routes.post("/subtarefa_usuario/remove_usuario", subtarefa_user.removeSubTarefaUsuarioControl)
routes.get("/subtarefa_usuario/:user_id", subtarefa_user.getSubtarefasUsuarioControl)


export { routes };  