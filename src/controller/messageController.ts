const setting = require('../../knexfile');
const knex = require('knex')(setting.development);

export const sendMessage = async (parent: any, args: any, ctx: any) => {
  const user = await ctx.meLoader();
  await knex('message').insert({
    sender: user.id,
    receiver: args.data.receiver,
    content: args.data.content,
    type: args.data.type,
    created_at: new Date(),
    updated_at: new Date()
  });
  ctx.pubsub.publish('Message', { MessageSubscription: args.data });
  return true;
}

export const getMessage = async (parent: any, args: any, ctx: any) => {
  const items = await knex('message')
                .where({ sender: args.sender, receiver: args.receiver }).orWhere({ receiver: args.sender, sender: args.receiver });
  console.log(items);
  return items;
}

export const getMessageList = async (parent: any, args: any, ctx: any) => {

}