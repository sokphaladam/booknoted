import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  knex.schema.table('book', (table: Knex.AlterTableBuilder) => {
    table.bigInteger('love');
    table.bigInteger('comment');
  }).then();
}


export async function down(knex: Knex): Promise<any> {
}

