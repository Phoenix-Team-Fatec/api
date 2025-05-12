import { MigrationInterface, QueryRunner } from "typeorm";

export class EtapaDescricaoOpcional1747048617170 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "etapa" ALTER COLUMN "etapa_descricao" DROP NOT NULL')
    }

    public async down(queryRunner: QueryRunner): Promise<void>{
        await queryRunner.query(`
            ALTER TABLE "etapa" 
            ALTER COLUMN "etapa_descricao" SET NOT NULL
        `);
    }

    
}
