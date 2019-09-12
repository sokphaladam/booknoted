const setting = require('../../knexfile');
const knex = require('knex')(setting.development);

export const getNotificationList = async (p: any, args: any, ctx: any) => {
  const user = await ctx.meLoader();
  const data = await knex('notification').where('user_id', user.id);
  let items: any[] = [];
  data.map((e: any) => {
    e.user = ctx.userDataLoader.load(e.action_by);
    e.book = knex('book').where('id', e.on_id).first();
    items.push(e);
  });

  return items;
}

export const getNotificationCount = async (p: any, args: any, ctx: any) => {
  const user = await ctx.meLoader();
  const data = await knex('notification').where('user_id', user.id);
  let count: number = 0;
  data.map((e: any) => {
    e.status = false;
    count++;
  });

  return count;
}

export const createNotificationList = async (data: any) => {
  await knex('notification').insert(data);
}

export const setStatus = async (p: any, args: any, ctx: any) => {
  try {
    await knex('notification').where('id', args.id).update({ status: true });
    ctx.pubsub.publish('Love', { CommentSubscription: true });
    return true;
  } catch (error) {
    return error;
  }
}