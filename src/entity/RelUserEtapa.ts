import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class RelUserEtapa{
    @PrimaryColumn({
        type: "int"
    })
    user_id!: number

    @PrimaryColumn({
        type: "int"
    })
    etapa_id!: number
}