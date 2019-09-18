const setting = require('../../knexfile');
const knex = require('knex')(setting.development);

export const sendMessage = async (parent: any, args: any, ctx: any) => {
  const user = await ctx.meLoader();
  const data = {
    sender: user.id,
    receiver: args.data.receiver,
    content: args.data.content,
    picture: args.data.picture,
    seen: false,
    type: args.data.type,
    created_at: new Date(),
    updated_at: new Date()
  }
  await knex('message').insert(data);
  await updateHistory(data);
  ctx.pubsub.publish('Message', { MessageSubscription: args.data });
  return true;
}

export const getMessage = async (parent: any, args: any, ctx: any) => {
  const items = await knex('message')
                .where({ sender: args.sender, receiver: args.receiver }).orWhere({ receiver: args.sender, sender: args.receiver });
  return items;
}

export const getMessageHistory = async (parent: any, args: any, ctx: any) => {
  const userList = await knex('user')
}

const updateHistory = async (data: any) => {
  
  const history = await knex('message_history').where({ sender: data.sender, receiver: data.receiver }).first();
  const countNotSeen = await knex('message').where({sender: data.receiver, seen: false}).count();

  if(history != null){
    await knex('message_history').where({ sender: data.sender, receiver: data.receiver }).update({
      sender: data.sender,
      receiver: data.receiver,
      type: data.type,
      content: data.content,
      count: countNotSeen,
      updated_at: new Date()
    });

    await knex('message_history').where({ sender: data.receiver, receiver: data.sender }).update({
      sender: data.receiver,
      receiver: data.sender,
      type: data.type,
      content: data.content,
      count: countNotSeen,
      updated_at: new Date()
    });
  }
  else{
    await knex('message_history').insert({
      sender: data.sender,
      receiver: data.receiver,
      type: data.type,
      content: data.content,
      count: countNotSeen,
      created_at: new Date(),
      updated_at: new Date()
    })

    await knex('message_history').insert({
      sender: data.receiver,
      receiver: data.sender,
      type: data.type,
      content: data.content,
      count: countNotSeen,
      created_at: new Date(),
      updated_at: new Date()
    })
  }
}