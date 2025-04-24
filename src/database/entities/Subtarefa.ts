import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Tarefa } from "./Tarefa"
import { Usuario } from "./Usuario"

@Entity()
export class Subtarefa{
    @PrimaryGeneratedColumn()
    subtarefa_id!: number

    @Column({
        type: "varchar",
        length: 30,
        nullable: false
    })
    subtarefa_nome!: string

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    subtarefa_descricao!: string

    @Column({
        type: "date",
        nullable: true
    })
    subtarefa_data_inicio!: Date

    @Column({
        type: "date",
        nullable: true
    })
    subtarefa_data_fim!: Date

    @Column({
        type: "boolean",
        nullable: false
    })
    subtarefa_status!: boolean

    @ManyToOne(() => Tarefa, tarefa => tarefa.subtarefas)
    @JoinColumn({ name: "tarefa_id" })
    tarefa!: Tarefa

    @ManyToOne(() => Usuario, usuario => usuario.subtarefas)
    usuarios!: Usuario[]
}