import { Entity, PrimaryColumn } from "typeorm"

@Entity()
export class RelUserSubTarefa{
    @PrimaryColumn({
        type: "int"
    })
    user_id!: number
    
    @PrimaryColumn({
        type: "int"
    })
    subtarefa_id!: number
}