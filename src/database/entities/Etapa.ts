import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Projeto } from "./Projeto";
import { Tarefa } from "./Tarefa";
import { Usuario } from "./Usuario";

@Entity()
export class Etapa {
    @PrimaryGeneratedColumn()
    etapa_id!: number;

    @Column({
        type: "varchar",
        length: 30,
        nullable: false
    })
    etapa_nome!: string;

    @Column({
        type: "varchar",
        length: 100,
    })
    etapa_descricao!: string;

    @Column({
        type: "date",
        nullable: false
    })
    etapa_data_inicio!: Date;

    @Column({
        type: "date"
    })
    etapa_data_fim!: Date;

    @Column({
        type: "boolean",
        nullable: false
    })
    etapa_status!: boolean;

    @ManyToOne(() => Projeto, projeto => projeto.proj_id)
    @JoinColumn({ name: "proj_id" })
    projeto!: Projeto;

    @OneToMany(() => Tarefa, tarefa => tarefa.etapa)
    tarefas!: Tarefa[];

    @ManyToMany(() => Usuario, usuario => usuario.etapas)
    usuarios!: Usuario[]
}