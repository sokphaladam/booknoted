import Dataloader from 'dataloader';
import { Graph } from '../interfaces/graph';
const setting = require('../knexfile');
const knex = require('knex')(setting.development);

const batchFriend = async (keys: number[]) => {
  const data = await knex('user_friend').whereIn('user_id', keys);

  return keys.map(key => {
    return data.filter((x: Graph.Friend) => x.user_id === key).map((x: any) => userDataLoader.load(x.friend));
  })
}

const batchUser = async (keys: number[]) => {
  const data = await knex('user').whereIn('id', keys);
  return data.map((x: Graph.User) => {
    return {
      ...x,
      friends: friendDataLoader.load(x.id)
    }
  })
}

export const userDataLoader = new Dataloader(batchUser);
export const friendDataLoader = new Dataloader(batchFriend);