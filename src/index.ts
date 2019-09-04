import { ApolloServer, gql } from 'apollo-server';
const setting = require('../knexfile');
const knex = require('knex')(setting.development);
import 'graphql-import-node';
import { resolvers } from '../graphql/resolvers';

const typeDefs = require('../graphql/schema/schema.graphql');

// const resolvers = {
//     Query: {
//         books: () => books,
//         users: () => {
//             return knex('user').then((r: any) => r)
//         }
//     },
// };

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});