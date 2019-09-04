import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    knex.schema.table('user_has_friend', (table: Knex.AlterTableBuilder) => {
        table.foreign('user_id').references('id').inTable('user');
        table.foreign('friend_id').references('id').inTable('user');
    }).then();
}


export async function down(knex: Knex): Promise<any> {
}

