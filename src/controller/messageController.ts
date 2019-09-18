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

  const user = await ctx.meLoader();
  const userList = await knex('user');
  let items: any[] = [];

  for (const x of userList) {
    const a = await getgetMessageHistoryBySendReceiver(x.id, user.id);
    if(x.id !== user.id){
      items.push({
        user: x,
        content: a != undefined ? a.content : "",
        type: a != undefined ? a.type : "text",
        count: a != undefined ? a.count : 0,
        created_at: a != undefined ? a.created_at : new Date(),
        updated_at: a != undefined ? a.updated_at : new Date()
      })
    }
  }
  return items;
}

export const seenMessage = async (parent: any, args: any, ctx: any) => {
  try {
    const user = await ctx.meLoader();
    await knex('message').where({ sender: args.user_id, receiver: user.id }).update('seen', true);
    await knex('message_history').where({ sender: args.user_id, receiver: user.id }).update('count', 0);
    ctx.pubsub.publish('Message', { MessageSubscription: args.data });
    return true;
  } catch (error) {
    return error;
  }
}

const getgetMessageHistoryBySendReceiver = async (sender: number, receiver: number) => {
  const data = await knex('message_history').where({ receiver, sender }).first();
  return data;
}

const updateHistory = async (data: any) => {

  const history = await knex('message_history').where({ sender: data.sender, receiver: data.receiver }).first();
  const countNotreceiver = await knex('message').count('* as count').where({ sender: data.receiver, receiver: data.sender, seen: false }).first();
  const countNotsender = await knex('message').count('* as count').where({ sender: data.sender, receiver: data.receiver, seen: false }).first();

  if (history != null) {
    await knex('message_history').where({ sender: data.sender, receiver: data.receiver }).update({
      sender: data.sender,
      receiver: data.receiver,
      type: data.type,
      content: data.content,
      count: countNotsender.count,
      updated_at: new Date()
    });

    await knex('message_history').where({ sender: data.receiver, receiver: data.sender }).update({
      sender: data.receiver,
      receiver: data.sender,
      type: data.type,
      content: data.content,
      count: countNotreceiver.count,
      updated_at: new Date()
    });
  }
  else {
    await knex('message_history').insert({
      sender: data.sender,
      receiver: data.receiver,
      type: data.type,
      content: data.content,
      count: countNotsender.count,
      created_at: new Date(),
      updated_at: new Date()
    })

    await knex('message_history').insert({
      sender: data.receiver,
      receiver: data.sender,
      type: data.type,
      content: data.content,
      count: countNotreceiver.count,
      created_at: new Date(),
      updated_at: new Date()
    })
  }
}