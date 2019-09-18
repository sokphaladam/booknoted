import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  knex.schema.createTable('message_history', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer('sender').unsigned();
    table.integer('receiver').unsigned();
    table.string('type');
    table.specificType('content', 'text');
    table.integer('count');
    table.timestamps();
    table.foreign('sender').references('id').inTable('user');
    table.foreign('receiver').references('id').inTable('user');
  }).then();
}


export async function down(knex: Knex): Promise<any> {
}

