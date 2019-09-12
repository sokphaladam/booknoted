import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  knex.schema.createTable('notification', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer('user_id').unsigned();
    table.string('type');
    table.integer('on_id');
    table.boolean('status');
    table.integer('action_by').unsigned();
    table.timestamps();
    table.foreign('user_id').references('id').inTable('user');
    table.foreign('action_by').references('id').inTable('user');
  }).then();
}


export async function down(knex: Knex): Promise<any> {
}

