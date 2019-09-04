import * as Knex from "knex";
import * as Faker from 'faker';

const user = (id: number) => {
    return{
        id,
        first_name: Faker.name.firstName(),
        last_name: Faker.name.lastName(),
        username: Faker.internet.userName(),
        password: Faker.internet.password(),
        picture: Faker.internet.avatar(),
        created_at: Faker.date.recent(),
        updated_at: Faker.date.recent()
    }
}

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("user").del()
        .then(() => {
            // Inserts seed entries
            let users = [];

            for (let i = 1; i <= 10; i++) {
                users.push(user(i));
            }

            return knex("user").insert(users);
        });
};
