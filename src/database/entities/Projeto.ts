import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Etapa } from "./Etapa"
import { Usuario } from "./Usuario"

@Entity()
export class Projeto{
    @PrimaryGeneratedColumn()
    proj_id!: number

    @Column({
        type: "varchar",
        length: 30,
        nullable: false
    })
    proj_nome!: string

    @Column({
        type: "varchar",
        length: 100
    })
    proj_descricao!: string

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
    })
    proj_area_atuacao!: string

    @Column({
        type: "date",
        nullable: false
    })
    proj_data_inicio!: Date

    @Column({
        type: "date"
    })
    proj_data_fim!: Date

    @Column({
        type: "double precision",
    })
    proj_status!: number

    @Column({
        type: "boolean",
        nullable: false
    })
    proj_excluido!: boolean

    @OneToMany(() => Etapa, etapa => etapa.projeto)
    etapas!: Etapa[]

    @ManyToMany(() => Usuario, usuario => usuario.projetos)
    usuarios!: Usuario[]
}