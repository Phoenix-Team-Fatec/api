import { Column, Entity, JoinColumn, ManyToMany, ManyToOne,OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Etapa } from "./Etapa"
import { Usuario } from "./Usuario"
import { AreaAtuacao } from "./AreaAtuacao"

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

// Novo campo para registrar a data de exclusão
    @Column({
        type: "timestamp",
        nullable: true
    })
    proj_data_exclusao!: Date | null;

    @Column({
        type: "text",
        array: true,
        nullable: true,
        default: () => "'{}'"
    })
    proj_inst_parceiras!: string[]


    @Column({
        type: "text",
        array: true,
        nullable: true,
        default: () => "'{}'"
    })
    proj_inst_financiadoras!: string[]


    
    @Column({
        type: "double precision",
        nullable:true
    })
    proj_valor_total!: number



    @ManyToOne(() => AreaAtuacao, areaAtuacao => areaAtuacao.projeto, { nullable: true })
    @JoinColumn({ name: "area_atuacao_id" })
    area_atuacao!: AreaAtuacao | null;

    @OneToMany(() => Etapa, etapa => etapa.projeto)
    etapas!: Etapa[]

    @ManyToMany(() => Usuario, usuario => usuario.projetos,{
        onDelete:'CASCADE'
    })
    usuarios!: Usuario[]
}