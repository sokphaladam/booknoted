import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    knex.schema.createTable('user', (table: Knex.CreateTableBuilder) => {
        table.increments();
        table.string('first_name');
        table.string('last_name');
        table.string('gender');
        table.string('username');
        table.string('password');
        table.string('picture');
        table.timestamps();
    }).then();
}


export async function down(knex: Knex): Promise<any> {
}

