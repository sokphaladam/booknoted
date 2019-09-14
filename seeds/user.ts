import * as Knex from "knex";
import * as Faker from 'faker';
import * as passwordHash from 'password-hash';
import { generate } from '../src/generate';

const user = (id: number) => {
    const first_name = Faker.name.firstName();
    const last_name = Faker.name.lastName();

    return{
        id,
        first_name,
        last_name,
        username: Faker.internet.userName(),
        password: passwordHash.generate("123456"),
        picture: Faker.internet.avatar(),
        created_at: Faker.date.recent(),
        updated_at: Faker.date.recent(),
        token: generate(32).toString() + first_name +'_'+ last_name
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
