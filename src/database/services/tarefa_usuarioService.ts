import { Tarefa } from "../entities/Tarefa";
import { Usuario } from "../entities/Usuario";
import { AppDataSource } from "../../ormconfig";


export class TarefaUsuarioService {

    private tarefaRepository = AppDataSource.getRepository(Tarefa)
    private usuarioRepository = AppDataSource.getRepository(Usuario)


    //Função para usuário ver suas tarefas
    async getTarefaUsuario(usuario_id: number): Promise<Tarefa[]> {
        const usuario = await this.usuarioRepository.findOne({
            where: { user_id: usuario_id },
            relations: ["tarefas", "tarefas.etapa"] // Adicione "tarefas.etapa" aqui
        });
    
        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }
    
        return usuario.tarefas;
    }



    //função para associar um usuário a uma tarefa
    async associateTarefaUsuario(tarefa_id: number, user_id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: { user_id: user_id },
            relations: ["tarefas"]
        });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        const tarefa = await this.tarefaRepository.findOneBy({ tarefa_id })


        if (!tarefa) {
            throw new Error("Etapa não encontrada");
        }

        usuario.tarefas.push(tarefa)


        return await this.usuarioRepository.save(usuario)

    }


    //função para remover um usuário de uma tarefa
    async removeTarefaUsuario(tarefa_id: number, user_id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: { user_id: user_id },
            relations: ["tarefas"]
        });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        const tarefa = await this.tarefaRepository.findOneBy({ tarefa_id })


        if (!tarefa) {
            throw new Error("Etapa não encontrada");
        }

        usuario.tarefas = usuario.tarefas.filter(t => t.tarefa_id != tarefa_id)


        return await this.usuarioRepository.save(usuario)

    }

    async getUsuarioTarefa(tarefa_id: number): Promise<Usuario[]> {

        const tarefa = await this.tarefaRepository.findOne({
            where: { tarefa_id: tarefa_id },
            relations: ["usuarios"]
        });

        if (!tarefa) {
            throw new Error("Usuário não encontrado");
        }

        return tarefa.usuarios
    }

    async deleteUsuarioTarefa(tarefa_id: number, user_id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { user_id },
            relations: ["tarefas"]
        });
        if (!usuario) throw new Error("Usuário não encontrado");

        usuario.tarefas = usuario.tarefas.filter(t => t.tarefa_id !== tarefa_id);

        // isso vai atualizar a tabela de junção removendo apenas a linha desejada
        return await this.usuarioRepository.save(usuario);
    }



    //função para selecionar usuários atribuidos a uma tarefa







}