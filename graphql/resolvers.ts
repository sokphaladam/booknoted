const setting = require('../knexfile');
const knex = require('knex')(setting.development);
import { createUser, getUserList, getUser, login, me } from '../src/controller/userController';
import { getBookList, createBook } from '../src/controller/BookController';

export const resolvers = {
    Query: {
        getUserList,
        getUser,
        getBookList,
        me
    },
    Mutation: {
        createUser,
        login,
        createBook,
    }
}