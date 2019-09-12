const setting = require('../../knexfile');
const knex = require('knex')(setting.development);

export const createComment = async (p: any, args: any, ctx: any) => {
  try {
    const user = await ctx.meLoader();
    const book = await knex('book').where('id', args.data.book_id).first();
    await knex('comment').insert({
      book_id: args.data.book_id,
      user_id: user.id,
      comment: args.data.comment,
      created_at: new Date(),
      updated_at: new Date()
    }).then( async () => {
      await knex('book').update('comment', book.comment + 1).where('id', args.data.book_id);
    })
    ctx.pubsub.publish('Love', { CommentSubscription: true });
    return true;
  } catch (error) {
    return false;
  }
}

export const getCommentList = async (p: any, args: any) => {
  const data = await knex('comment').where('book_id', args.book_id);
  return data;
}