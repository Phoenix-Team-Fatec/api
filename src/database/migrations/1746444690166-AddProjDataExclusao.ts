import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjDataExclusao1746444690166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projeto" ADD "proj_data_exclusao" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projeto" DROP COLUMN "proj_data_exclusao"`);
    }

}
