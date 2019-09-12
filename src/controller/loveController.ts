import { createNotificationList } from "./notificationController";

const setting = require('../../knexfile');
const knex = require('knex')(setting.development);

export const createLove = async (p: any, args: any, ctx: any) => {
  try {
    const user = await ctx.meLoader();
    const book = await knex('book').where('id', args.id).first();
    const data = await knex('love').where({ 'user_id': user.id, 'book_id': args.id }).first();
    
    if(data == null) {
      await knex('book').where('id', args.id).update('love', book.love + 1);
      await knex('love').insert({ user_id: user.id, book_id: args.id, created_at: new Date(), updated_at: new Date() });
      await createNotificationList({
        user_id: book.user_id,
        type: 'love',
        on_id: args.id,
        status: false,
        action_by: user.id,
        created_at: new Date(), 
        updated_at: new Date()
      });
    }
    else{
      await knex('book').where('id', args.id).update('love', book.love - 1);
      await knex('love').where({ 'user_id': user.id, 'book_id': args.id }).del();
      await knex('notification').where({ type: 'love', action_by: user.id, on_id: args.id }).del();
    }
    ctx.pubsub.publish('Love', { LoveSubscription: true });
    return true;
  } catch (error) {
    return error;
  }
}

export const getLoveList = async (p: any, args: any, ctx: any) => {
  const user = await ctx.meLoader();
  const data = await knex('love').where('user_id', user.id);
  return data;
}

export const getLove = async (p: any, args: any, ctx: any) => {
  const user = await ctx.meLoader();
  const data = await knex('love').where({
    user_id: user.id,
    book_id: args.book_id
  }).first();
  return data;
}