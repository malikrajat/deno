import db from "../config/db.ts";

// Declare the collections here. Here we are using only one collection (i.e friends).
const users = db.collection("users");

// This is the function that adds a friend to the database.
export default {
  // get all the user list
  async index(ctx: any) {
    const data = await users.find();
    ctx.response.body = data;
  },

  // get user by ID
  async show(ctx: any) {
    try {
      // accessing the id of friend from the request params
      let id: string = ctx.params.id;
      // searching the db for a friend with the given id
      const data: any = await users.findOne({ _id: { "$oid": id } });
      if (data) { // Response if friend is found
        ctx.response.body = data;
        ctx.response.status = 200;
      } else { // Response if no friend exits with the given id
        ctx.response.body = "not found";
        ctx.response.status = 204;
      }
    } // if some error occured while searching the db
    catch (e) {
      ctx.response.body = null;
      ctx.response.status = 500;
    }
  },

  // insert user in DB
  async store(ctx: any) {
    try {
      // acessing data from the request body
      let body: any = await ctx.request.body();
      const { name, email, password, avatar, date } = body.value;
      console.log(name, password, avatar, date, email);

      // inserting into the db
      const id = await users.insertOne({
        name,
        password,
        avatar,
        date,
        email,
      });

      // sending the response
      ctx.response.body = id;
      ctx.response.status = 201;
    } // when the insertion fails
    catch (e) {
      ctx.response.body = null;
      ctx.response.status = 500;
      console.log(e);
    }
  },
  update(ctx: any) {},
  delete(ctx: any) {},
};
