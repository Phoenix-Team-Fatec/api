import { Entity, PrimaryColumn } from "typeorm"

@Entity()
export class ResponsavelUserTarefa{
    @PrimaryColumn({
        type: "int"
    })
    user_id!: number

    @PrimaryColumn({
        type: "int"
    })
    tarefa_id!: number
}