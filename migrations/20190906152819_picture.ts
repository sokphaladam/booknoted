import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  knex.schema.createTable('picture', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('filename');
    table.timestamps();
  }).then();
}


export async function down(knex: Knex): Promise<any> {
}

