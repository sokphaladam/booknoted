import { ApolloServer, gql } from 'apollo-server-express';
const setting = require('../knexfile');
const knex = require('knex')(setting.development);
import 'graphql-import-node';
import { resolvers } from '../graphql/resolvers';
import { userDataLoader } from '../loaders/dataloader';
import express from 'express';

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

const app = express();
app.use('/images', express.static('images'));
server.applyMiddleware({ app, path: '/playground' });

app.listen(4000);