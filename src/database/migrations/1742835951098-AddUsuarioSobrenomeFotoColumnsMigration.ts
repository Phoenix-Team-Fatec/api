import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUsuarioSobrenomeFotoColumnsMigration1742835951098 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usuarioTable = await queryRunner.getTable("usuario");
        
        if (!usuarioTable.columns.find(c => c.name === "user_sobrenome")) {
            await queryRunner.addColumn(
                "usuario",
                new TableColumn({
                    name: "user_sobrenome",
                    type: "varchar",
                    isNullable: true,
                })
            );
        }

        if (!usuarioTable.columns.find(c => c.name === "user_foto")) {
            await queryRunner.addColumn(
                "usuario",
                new TableColumn({
                    name: "user_foto",
                    type: "varchar",
                    isNullable: true,
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const usuarioTable = await queryRunner.getTable("usuario");
        
        if (usuarioTable.columns.find(c => c.name === "user_foto")) {
            await queryRunner.dropColumn("usuario", "user_foto");
        }
        
        if (usuarioTable.columns.find(c => c.name === "user_sobrenome")) {
            await queryRunner.dropColumn("usuario", "user_sobrenome");
        }
    }
}