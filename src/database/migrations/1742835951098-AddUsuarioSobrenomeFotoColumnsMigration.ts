import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUsuarioSobrenomeFotoColumnsMigration1742835951098 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "usuario",
            new TableColumn({
                name: "user_sobrenome",
                type: "varchar",
                isNullable: true,
            })
        );

        await queryRunner.addColumn(
            "usuario",
            new TableColumn({
                name: "user_foto",
                type: "varchar",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("usuario", "user_foto");
        await queryRunner.dropColumn("usuario", "user_sobrenome");
    }

}
