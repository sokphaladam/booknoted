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
    {
        id: 2,
        title: 'The Moon being round, half of it is lit up by the sun. As it goes around (or orbits) the Earth, sometimes the side that people on Earth can see is all lit brightly. Other times only a small part of the side we see is lit. This is because the Moon does not send out its own light. People only see the parts that are being lit by sunlight. These different stages are called Phases of the Moon.',
        picture: '[\"http://104.248.156.237:4000/images/VxfhJNtJpexels-photo-2387069.jpeg\",\"http://104.248.156.237:4000/images/1vmRznMapexels-photo-2683768.jpeg\", \"http://104.248.156.237:4000/images/UAa3Okqbpexels-photo-1358833.jpeg\"]',
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        id: 3,
        title: 'Motorbikes up to 125cc can be ridden legally without a license, however, check your travel insurance wording. Many insurers will require a license from the destination country or your home country, so this loophole may not work for you!',
        picture: '[\"http://104.248.156.237:4000/images/A8At6LCZpexels-photo-1413412.jpeg\"]',
        user_id: 3,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        id: 4,
        title: 'The Moon being round, half of it is lit up by the sun. As it goes around (or orbits) the Earth, sometimes the side that people on Earth can see is all lit brightly. Other times only a small part of the side we see is lit. This is because the Moon does not send out its own light. People only see the parts that are being lit by sunlight. These different stages are called Phases of the Moon.',
        picture: '[\"http://104.248.156.237:4000/images/A8At6LCZpexels-photo-1413412.jpeg\"]',
        user_id: 4,
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
