const setting = require('../../knexfile');
const knex = require('knex')(setting.development);

export const getFriendList = async (parent: any, args: any, ctx: any) => {
  const user = await ctx.meLoader();
  let friends: any[] = await knex('user_friend').where('friend', user.id);
  let youFriends: any[] = await knex('user_friend').where('user_id', user.id);

  friends.map((x: any) => {
    x.user = ctx.userDataLoader.load(x.user_id);
    x.approved = false;
    youFriends.map((y: any) => {
      if(y.user_id === x.friend && y.friend === x.user_id) {
        return x.approved = true
      }
    })
  })
  return friends;
}

export const FriendAdd = async (parent: any, args: any, ctx: any) => {
  try {
    const user = await ctx.meLoader();
    await knex('user_friend').insert({ user_id: user.id, friend: args.id, created_at: new Date(), updated_at: new Date() });
    return true;
  } catch (error) {
    return error;
  }
}

export const FriendApproved = async (parent: any, args: any, ctx: any) => {
  await FriendAdd(parent, args, ctx);
}