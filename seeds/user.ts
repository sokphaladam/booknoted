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

const bookData = [
    {
        id: 1,
        title: 'THE MIGHTY CHUNKS rise all over the world, including the oceans. They usually have steep, sloping sides and sharp or rounded ridges, and a high point, called a peak or summit. Most geologists classify a mountain as a landform that rises at least 1,000 feet (300 meters) or more above its surrounding area. A mountain range is a series or chain of mountains that are close together.',
        picture: '[\"http://104.248.156.237:4000/images/1YCtIWuzpexels-photo-1366919.jpeg\", \"http://104.248.156.237:4000/images/8e1vtenYpexels-photo-1624496.jpeg\"]',
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
    },
]

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("user").del()
        .then(() => {
            // Inserts seed entries
            let users = [];

            for (let i = 1; i <= 10; i++) {
                users.push(user(i));
            }

            return knex("user").insert(users).then(() => {
                return knex('book').del().then(()=>{
                    return knex("book").insert(bookData);
                })
            });
        });
};
