import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  knex.schema.table('message', (table: Knex.AlterTableBuilder) => {
    table.string('picture');
    table.boolean('seen');
  }).then();
}


export async function down(knex: Knex): Promise<any> {
}

