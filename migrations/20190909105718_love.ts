import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  knex.schema.createTable('love', (table: Knex.CreateTableBuilder) => {
    table.integer('book_id').unsigned();
    table.integer('user_id').unsigned();
    table.timestamps();
    table.primary(['user_id', 'book_id']);
  }).then();
}


export async function down(knex: Knex): Promise<any> {
}

