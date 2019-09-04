import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    knex.schema.createTable('user_has_friend', (table: Knex.CreateTableBuilder) => {
        table.integer('user_id').unsigned();
        table.integer('friend_id').unsigned();
        table.primary(['user_id', 'friend_id']);
        table.timestamps();
    }).then();
}


export async function down(knex: Knex): Promise<any> {
}

