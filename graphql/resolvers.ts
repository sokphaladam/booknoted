const setting = require('../knexfile');
const knex = require('knex')(setting.development);
import { createUser, getUserList, getUser, login, me } from '../src/controller/userController';
import { getBookList, createBook } from '../src/controller/bookController';
import { createLove } from '../src/controller/loveController';
import { createComment, getCommentList } from '../src/controller/commentController';
import { createWriteStream } from 'fs';
import { generate } from '../src/generate';
import { PubSub } from 'apollo-server-express';

const pubsub = new PubSub();

export const resolvers = {
    Query: {
        getUserList,
        getUser,
        getBookList,
        me,
        getCommentList,
        getPictureList: async () => {
            const data = await knex('picture');
            return data;
        }
    },
    Mutation: {
        createUser,
        login,
        createBook,
        createLove,
        createComment,
        singleUpload: async (parent: any, args: any) => {
            const { createReadStream, filename } = await args.file;
            const uuid = generate(8);
            await new Promise(res => {
                createReadStream().pipe(createWriteStream(`./images/${uuid}${filename}`))
                .on('close', res)
            });

            return await knex('picture').insert({
                filename: `/images/${uuid}${filename}`,
                created_at: new Date(),
                updated_at: new Date()
            }).then(() => `/images/${uuid}${filename}`);
        }
    },
    Subscription: {
        setLove: {
            subscribe: (parent: any, args: any, ctx: any) => ctx.pubsub.asyncIterator('Love')
        }
    }
}