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
        title: 'City Beautiful movement, American urban-planning movement led by architects, landscape architects, and reformers that flourished between the 1890s and the 1920s. The idea of organized comprehensive urban planning arose in the United States from the City Beautiful movement, which claimed that design could not be separated from social issues and should encourage civic pride and engagement. Its influence was most prominent in cities such as Cleveland, Chicago, and Washington, D.C.',
        picture: '[\"http://104.248.156.237:4000/images/ESZww794architecture-buildings-city-1769386.jpg\"]',
        user_id: 4,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        id: 5,
        title: 'The movement first gained ground in 1893 with the World’s Columbian Exposition in Chicago. Daniel H. Burnham headed the construction of the fair’s temporary city, known to those who attended as the “White City,” a semi-utopia in which visitors were meant to be shielded from poverty and crime. Burnham’s plans for the site incorporated the designs of architects trained at the École des Beaux-Arts in Paris, who paired the balance and harmony of Neoclassical and Baroque architecture with the aesthetic of Chicago’s buildings and cityscape. The landscape of the Columbian Exposition, which included lagoons and big green expanses, was designed by Frederick Law Olmsted, Sr., famous for his winning design of New York City’s oasis, Central Park, which broke ground in 1857. To not only enhance the city’s appearance but also help the flow of vehicle and pedestrian traffic, the City Beautiful concept focused on incorporating a civic centre, parks, and grand boulevards. The holistic and multipurpose approach to urban planning that was championed by Burnham and displayed at the Columbian Exposition remained at the forefront of architecture, landscape architecture, and design for many years. Its impact is still visible in many cities throughout the United States.',
        picture: '[\"http://104.248.156.237:4000/images/F0yDyaCaarchitecture-buildings-city-325185.jpg\"]',
        user_id: 5,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        id: 6,
        title: 'The cat is a small carnivorous mammal. It is the only domesticated species in the family Felidae and often referred to as the domestic cat to distinguish it from wild members of the family. The cat is either a house cat or a farm cat, which are pets, or a feral cat, which ranges freely and avoids human contact.',
        picture: '[\"http://104.248.156.237:4000/images/m03m2MGDpexels-photo-747795.jpeg\",\"http://104.248.156.237:4000/images/geJh0yBVpexels-photo-1276553.jpeg\", \"http://104.248.156.237:4000/images/jL40ozB9pexels-photo-749212.jpeg\", \"http://104.248.156.237:4000/images/KJjDxol0pexels-photo-2194261.jpeg\"]',
        user_id: 6,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        id: 7,
        title: 'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.',
        picture: '[\"http://104.248.156.237:4000/images/KXmSzvotmarvel-doctor-strange-wallpaper.jpg\",\"http://104.248.156.237:4000/images/PjoXe9jsWebp.net-resizeimage-4.jpg\",\"http://104.248.156.237:4000/images/qFlnMoLfThe-Avengers-fantasy-warrior-Thor-super-hero-Poster-Ultra-HD-4k-Wallpaper-2880x1800-915x515.jpg\", \"Uu1cf5V8captain-marvel-3090.jpg\",\"http://104.248.156.237:4000/images/y4MSxpvzpapers.co-be92-spiderman-suit-avengers-infinitywar-marvel-hero-art-film-29-wallpaper.jpg\"]',
        user_id: 7,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        id: 8,
        title: 'Noun. angel of death (plural angels of death) A personification of death in fiction, art, mythology, or religion. An angel which attends to death, collecting souls at death, ending life at the appointed death. An angel in Abrahamic scripture or eschatology that attends to death.',
        picture: '[\"http://104.248.156.237:4000/images/szJiPoOjangel-art-black-and-white-208001.jpg\"]',
        user_id: 8,
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
