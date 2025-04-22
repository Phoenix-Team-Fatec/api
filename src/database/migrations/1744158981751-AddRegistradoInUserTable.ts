import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRegistradoInUserTable1744158981751 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usuarioTable = await queryRunner.getTable("usuario");
        
        if (!usuarioTable.columns.find(c => c.name === "registrado")) {
            await queryRunner.addColumn("usuario", new TableColumn({
                name: "registrado",
                type: "boolean",
                isNullable: false,
                default: true
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const usuarioTable = await queryRunner.getTable("usuario");
        
        if (usuarioTable.columns.find(c => c.name === "registrado")) {
            await queryRunner.dropColumn("usuario", "registrado");
        }
    }
}