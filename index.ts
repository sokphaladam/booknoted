import { ApolloServer, gql, PubSub } from 'apollo-server-express';
const setting = require('./knexfile');
const knex = require('knex')(setting.development);
import 'graphql-import-node';
import { resolvers } from './graphql/resolvers';
import { userDataLoader } from './loaders/dataloader';
import express from 'express';
import http from 'http';

const typeDefs = require('./graphql/schema/schema.graphql');

const server = new ApolloServer(
    {
        typeDefs,
        resolvers,
        subscriptions: {
            onConnect: () => console.log('Connected to websocket'),
            onDisconnect: () => console.log('Disconnected to websocket')
        },
        context: ({req}: any) => {

            const meLoader = async () => {
                const data = await knex('user').where('token', req.query.token).first();
                return userDataLoader.load(data.id);
            }
            
            const pubsub = new PubSub();

            return { userDataLoader, meLoader, pubsub}
        }
    }
);

const app = express();
app.use('/images', express.static('images'));
server.applyMiddleware({ app, path: '/playground' });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(4000);