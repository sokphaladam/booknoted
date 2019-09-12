const setting = require('../knexfile');
const knex = require('knex')(setting.development);
import { createUser, getUserList, getUser, login, me } from '../src/controller/userController';
import { getBookList, createBook, getBook } from '../src/controller/bookController';
import { createLove, getLoveList, getLove } from '../src/controller/loveController';
import { createComment, getCommentList } from '../src/controller/commentController';
import { getNotificationList, setStatus } from '../src/controller/notificationController';
import { createWriteStream } from 'fs';
import { generate } from '../src/generate';

export const resolvers = {
    Query: {
        getUserList,
        getUser,
        getBookList,
        getBook,
        me,
        getCommentList,
        getLoveList,
        getLove,
        getNotificationList,
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
        setStatus,
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
        LoveSubscription: {
            subscribe: (parent: any, args: any, ctx: any) => ctx.pubsub.asyncIterator('Love')
        },
        CommentSubscription: {
            subscribe: (parent: any, args: any, ctx: any) => ctx.pubsub.asyncIterator('Comment')
        }
    }
}