import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Subtarefa } from "./Subtarefa"
import { Etapa } from "./Etapa"
import { Usuario } from "./Usuario"

@Entity()
export class Tarefa{
    @PrimaryGeneratedColumn()
    tarefa_id!: number

    @Column({
        type: "varchar",
        length: 30,
        nullable: false
    })
    tarefa_nome!: string

    @Column({
        type: "varchar",
        length: 100,
    })
    tarefa_descricao!: string

    @Column({
        type: "date",
        nullable: false
    })
    tarefa_data_inicio!: Date

    @Column({
        type: "date"
    })
    tarefa_data_fim!: Date

    @Column({
        type: "boolean",
        nullable: false
    })
    tarefa_status!: boolean

    @ManyToOne(() => Etapa, etapa => etapa.tarefas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'etapa_id' })
    etapa!: Etapa;
    

    @OneToMany(() => Subtarefa, subtarefa => subtarefa.tarefa)
    subtarefas!: Subtarefa[]

    @ManyToMany(() => Usuario, usuario => usuario.tarefas)
    usuarios!: Usuario[]
}