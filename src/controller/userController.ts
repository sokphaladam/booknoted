const setting = require('../../knexfile');
const knex = require('knex')(setting.development);
import * as passwordHash from 'password-hash';
import * as Faker from 'faker';

export const createUser = async (p: any, args: any) => {
  const data = args.data;
  data.password = passwordHash.generate(data.password);
  data.created_at = new Date();
  data.updated_at = new Date();
  data.picture = Faker.image.avatar();
  const res = await knex('user').insert(data).then(() => true);
  return res;
}

export const getUserList = async (p: any, args: any, ctx: any) => {
  const data: any[] = await knex('user');
  let items: any[] = [];
  data.map((x: any) => {
      items.push(ctx.userDataLoader.load(x.id));
  });
  return items;
}

export const getUser = async (p: any, args: any, ctx: any) => {
  return await ctx.userDataLoader.load(args.id);
}

export const login = async (p: any, args: any, ctx: any) => {
  const res = await knex('user').where({username: args.username}).first();
  if(passwordHash.verify(args.password, res.password) == true) return res.token;
}

export const me = async (p: any, args: any, ctx: any, b: any) => {
  return await ctx.meLoader();
}

export const add_friend = async (p: any, args: any, ctx: any, b: any) => {
  
}

export const confirm_friend = async (p: any, args: any, ctx: any, b: any) => {

}