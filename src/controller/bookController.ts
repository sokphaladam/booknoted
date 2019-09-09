const setting = require('../../knexfile');
const knex = require('knex')(setting.development);

export const getBookList = async (p: any, args: any, ctx: any) => {
  const data = await knex('book');
  let items: any[] = [];
  data.map((x: any) => {
      x.user = ctx.userDataLoader.load(x.user_id);
      items.push(x);
  });
  return items;
}

export const getBook = async (p: any, args: any, ctx: any) => {
  const data = await knex('book').where('id', args.id).first();
  return data.map((x: any) => {
    data.user = ctx.userDataLoader.load(x.user_id);
  })
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

export const createLove = async (p: any, args: any, ctx: any) =>{
  const data = await knex('book').where('id', args.id).first();
  const res = await knex('book').where('id', args.id).update('love', Number(data.love) + 1).then((r: any) => true); 
  return res;
}