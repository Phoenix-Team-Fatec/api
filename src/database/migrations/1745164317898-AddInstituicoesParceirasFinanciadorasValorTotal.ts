import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddInstituicoesParceirasFinanciadorasValorTotal1745164317898 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("projeto", new TableColumn({
            name: 'instituicoes_parceiras',
            type:'text[]',
            isNullable:false,
            default:"'{}'"
        }));


        await queryRunner.addColumn("projeto", new TableColumn({
            name:'instituicoes_financiadoras',
            type:'text[]',
            isNullable:false,
            default:"'{}'"
        }))

        await queryRunner.addColumn("projeto", new TableColumn({
            name:'valor_total',
            type:'double precision',
            isNullable:false,
            default:0
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("projeto", "instituicoes_parceiras")
        await queryRunner.dropColumn("projeto", "instituicoes_financiadoras")
        await queryRunner.dropColumn("projeto", "valor_total")

    }

}
