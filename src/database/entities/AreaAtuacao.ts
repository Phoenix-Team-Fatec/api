import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Projeto } from "./Projeto"

@Entity()
export class AreaAtuacao{
    @PrimaryGeneratedColumn()
    area_atuacao_id!:number

    @Column({
        type:"varchar",
        length:30,
        nullable:false
    })
    area_atuacao_nome!:string


   @OneToMany(() => Projeto, projeto => projeto.area_atuacao)
   projeto!: Projeto[]
}
