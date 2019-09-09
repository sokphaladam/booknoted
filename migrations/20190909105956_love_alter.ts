import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  knex.schema.table('love', (table: Knex.AlterTableBuilder) => {
    table.foreign('user_id').references('id').inTable('user');
    table.foreign('book_id').references('id').inTable('book');
  }).then();
}


export async function down(knex: Knex): Promise<any> {
}

