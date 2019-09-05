import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  knex.schema.table('user', (table: Knex.AlterTableBuilder) => {
    table.string('token');
  }).then();
}


export async function down(knex: Knex): Promise<any> {
}

