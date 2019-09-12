const setting = require('../../knexfile');
const knex = require('knex')(setting.development);

const getLove = async (user_id: number, book_id: number) => {
  if(user_id == undefined) return false;
  const qry = await knex('love').where({ user_id, book_id }).first();
  if(qry == null) return false;
  else return true;
}

export const getBookList = async (p: any, args: any, ctx: any) => {
  const data = await knex('book').orderBy('id', 'desc');
  const user = await ctx.meLoader();
  let items: any[] = [];
  data.map((x: any) => {
      x.user = ctx.userDataLoader.load(x.user_id);
      x.isLove = getLove(user.id, x.id);
      items.push(x);
  });
  return items;
}

export const getBook = async (p: any, args: any, ctx: any) => {
  const data = await knex('book').where('id', args.id).first();
  const user = ctx.meLoader();
  data.user = ctx.userDataLoader.load(data.user_id);
  data.isLove = getLove(user.id, data.id);
  return data;
}

export const createBook = async (p: any, args: any, ctx: any) =>{ 
  const data = args.data;
  data.created_at = new Date();
  data.updated_at = new Date();
  data.love = 0;
  data.comment = 0;
  data.user_id = await ctx.meLoader().then((r: any) => r.id);
  const res = await knex('book').insert(data).then((r: any) => true);
  return res;
}