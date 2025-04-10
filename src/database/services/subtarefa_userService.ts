import { AppDataSource } from "../../ormconfig";
import { RelUserSubTarefa } from "../entities/RelUserSubtarefa";
import { Subtarefa } from "../entities/Subtarefa";
import { Usuario } from "../entities/Usuario";


export class Subtarefa_UserService{

   
    private usuarioRepo = AppDataSource.getRepository(Usuario)
    private subtarefaRepo = AppDataSource.getRepository(Subtarefa)

    constructor(){
        
        this.usuarioRepo = AppDataSource.getRepository(Usuario)
        this.subtarefaRepo = AppDataSource.getRepository(Subtarefa)
    }



    //função para pegar subtarefas de um usuário
    async getSubtarefasUsuario(user_id:number):Promise<Subtarefa[]>{

        const usuario = await this.usuarioRepo.findOne({
            where:{user_id:user_id},
            relations:['subtarefas']
        })

        if(!usuario){
            throw new Error("Usuário não encontrado")
        }

        return usuario.subtarefas
    }


     //função para associar subtarefa a um usuário
     async associateSubtarefaUsuario(subtarefa_id:number, user_id:number):Promise<Usuario>{

        const usuario = await this.usuarioRepo.findOne({
            where:{user_id:user_id},
            relations:['subtarefas']
        })

        if(!usuario){
            throw new Error("Usuário não encontrado")
        }

        const subtarefa = await this.subtarefaRepo.findOne({
            where:{subtarefa_id:subtarefa_id}
        })


        if(!subtarefa){
            throw new Error("Subtarefa não encontrada")
        }

        usuario.subtarefas.push(subtarefa)

        return await this.usuarioRepo.save(usuario)

    }


    //função para remover subtarefas de um usuário
    async removeSubTarefaUsuario(subtarefa_id:number, user_id:number):Promise<Usuario>{

        const usuario = await this.usuarioRepo.findOne({
            where: { user_id: user_id },
            relations: ["subtarefas"]
        });

        if(!usuario){
            throw new Error("Usuário não encontrado");
        }

        const subtarefa = await this.subtarefaRepo.findOneBy({subtarefa_id:subtarefa_id})

        
        if (!subtarefa) {
            throw new Error("Subtarefa não encontrada");
        }

        usuario.subtarefas = usuario.subtarefas.filter(t => t.subtarefa_id != subtarefa_id)


        return await this.usuarioRepo.save(usuario)

    }







}