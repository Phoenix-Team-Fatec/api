import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class RelUserProjeto{
    @PrimaryColumn({
        type: "int"
    })
    user_id!: number

    @PrimaryColumn({
        type: "int"
    })
    proj_id!: number

    @Column({
        type: "boolean",
        nullable: false,
        default: false
    })
    coordenador!: boolean
}