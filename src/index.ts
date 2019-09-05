import { ApolloServer, gql } from 'apollo-server';
const setting = require('../knexfile');
const knex = require('knex')(setting.development);
import 'graphql-import-node';
import { resolvers } from '../graphql/resolvers';
import { userDataLoader } from '../loaders/dataloader';

const typeDefs = require('../graphql/schema/schema.graphql');

const server = new ApolloServer(
    {
        typeDefs,
        resolvers,
        context: ({req}: any) => {

            const meLoader = async () => {
                const data = await knex('user').where('token', req.query.token).first();
                return userDataLoader.load(data.id);
            }

            return {
                userDataLoader,
                meLoader
            }
        }
    }
);

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});