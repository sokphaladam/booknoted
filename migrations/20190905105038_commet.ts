import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  knex.schema.createTable('comment', (table: Knex.AlterTableBuilder) => {
    table.increments();
    table.integer('book_id').unsigned().references('id').inTable('book');
    table.integer('user_id').unsigned().references('id').inTable('user');
    table.string('comment');
    table.timestamps();
  }).then();
}


export async function down(knex: Knex): Promise<any> {
}

