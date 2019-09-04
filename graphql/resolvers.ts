const setting = require('../knexfile');
const knex = require('knex')(setting.development);
import { Graph } from '../interfaces/graph';
import DataLoader from 'dataloader';

const getFriend = (id: number) => {
    return knex('user_has_friend').where('user_id', id).then((r: Graph.Friend[]) => {
        let data: Graph.User[] = [];
        for(let i = 0; i < r.length; i++) {
           const item = knex('user').where('id', r[i].friend_id).first().then((a: any) => a);
           data.push(item);
        }

        return data;
    });
}

// function reviewDataLoader() {
//     return new DataLoader(reviewByFriendId);
// }

// async function reviewByFriendId(id: any[]) {
//     knex(' ')
// }

export const resolvers = {
    Query: {
        getUserList: () => {
            return knex('user').then((r: any) => {
                return r;
            }); 
        },
        getUser: (p: any, args: any) => {
            return knex('user').where('id', args.id).first().then((r: Graph.User) => {
                let data: Graph.User = r;
                data.friends = getFriend(data.id);
                return data;
            });
        }
    },
    Mutation: {
        createUser: () => {}
    }
}