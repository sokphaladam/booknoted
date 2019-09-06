const setting = require('../knexfile');
const knex = require('knex')(setting.development);
import { createUser, getUserList, getUser, login, me } from '../src/controller/userController';
import { getBookList, createBook } from '../src/controller/BookController';
import { Graph } from '../interfaces/graph';
import multer from 'multer';
import { createWriteStream } from 'fs';
import { v4 } from 'uuid';
import { generate } from '../src/generate';

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage });

export const resolvers = {
    Query: {
        getUserList,
        getUser,
        getBookList,
        me,
        getPictureList: async () => {
            const data = await knex('picture');
            return data;
        }
    },
    Mutation: {
        createUser,
        login,
        createBook,
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
    }
}