import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRegistradoInUserTable1744158981751 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("usuario", new TableColumn({
            name: "registrado",
            type: "boolean",
            isNullable: false,
            default: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("usuario", "registrado");
    }

}
