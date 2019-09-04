import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    knex.schema.createTable('book', (table: Knex.CreateTableBuilder) => {
        table.increments();
        table.string('title');
        table.string('picture');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable('user');
        table.timestamps();
    }).then();
}


export async function down(knex: Knex): Promise<any> {
}

