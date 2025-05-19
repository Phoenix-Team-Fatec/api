import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";


export class PontosHistoriaTarefa1747651148400 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tarefaTable = await queryRunner.getTable("tarefa")
        
         if (!tarefaTable.columns.find(c => c.name === "pontos_historias")) {
                    await queryRunner.addColumn("tarefa", new TableColumn({
                        name: 'pontos_historias',
                        type: 'integer',
                        isNullable: true,
                    }));
                }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         const tarefaTable = await queryRunner.getTable("tarefa");
        
        if (tarefaTable.columns.find(c => c.name === "pontos_historias")) {
            await queryRunner.dropColumn("tarefa", "pontos_historias");
        }
        
    }

}
