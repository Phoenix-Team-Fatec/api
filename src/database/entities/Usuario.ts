import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Etapa } from "./Etapa"
import { Projeto } from "./Projeto"
import { Subtarefa } from "./Subtarefa"
import { Tarefa } from "./Tarefa"

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    user_id!: number

    @Column({
        type: "varchar",
        length: 30,
        nullable: false
    })
    user_nome!: string

    @Column({
        type: "varchar",
        length: 30,
        nullable: true,
    })
    user_sobrenome!: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
        unique: true
    })
    user_email!: string

    @Column({
        type: "varchar",
        length: 255,
        nullable: true,
    })
    user_foto!: string;

    @Column({
        type: "boolean",
        default: true,
    })
    registrado!: boolean;


    @ManyToMany(() => Etapa, etapa => etapa.usuarios)
    @JoinTable({
        name: "rel_user_etapa",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "user_id"
        },
        inverseJoinColumn: {
            name: "etapa_id",
            referencedColumnName: "etapa_id"
        }
    })
    etapas!: Etapa[]

    @ManyToMany(() => Projeto, projeto => projeto.usuarios)
    @JoinTable({
        name: "rel_user_projeto",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "user_id"
        },
        inverseJoinColumn: {
            name: "proj_id",
            referencedColumnName: "proj_id"
        }
    })
    projetos!: Projeto[]

    @ManyToMany(() => Subtarefa, subtarefa => subtarefa.usuarios)
    @JoinTable({
        name: "rel_user_subtarefa",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "user_id"
        },
        inverseJoinColumn: {
            name: "subtarefa_id",
            referencedColumnName: "subtarefa_id"
        }
    })
    subtarefas!: Subtarefa[]

    @ManyToMany(() => Tarefa, tarefa => tarefa.usuarios)
    @JoinTable({
        name: "responsavel_user_tarefa",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "user_id"
        },
        inverseJoinColumn: {
            name: "tarefa_id",
            referencedColumnName: "tarefa_id"
        }
    })
    tarefas!: Tarefa[]
}