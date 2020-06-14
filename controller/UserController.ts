import db from "../config/db.ts";
import Validation from "../validation.ts";
// Declare the collections here. Here we are using only one collection (i.e friends).
const users = db.collection("users");

// This is the function that adds a friend to the database.
export default {
  // get all the user list
  async index(ctx: any) {
    try {
      const data = await users.find();
      ctx.response.body = data;
    } catch (error) {
      ctx.response.body = null;
      ctx.response.status = 500;
    }
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
      //       const { value } = body;
      //       const id = await users.insertOne({
      // 	      value,
      // });
      const validationCheck = await Validation.Validate(ctx);
      if (validationCheck) {
        let body: any = await ctx.request.body();
        const { name, email, password, avatar, date } = body.value;
        //       inserting into the db
        const id = await users.insertOne({
          name,
          password,
          avatar,
          date,
          email,
        });
        // sending the response
        ctx.response.body = { message: "Inserted." };
        ctx.response.status = 200;
      }
    } // when the insertion fails
    catch (e) {
      ctx.response.body = null;
      ctx.response.status = 500;
    }
  },

  // update user
  async update(ctx: any) {
    try {
      if (!ctx.request.hasBody) {
        // when request body do not have data
        ctx.response.body = { error: "please provide required data." };
        ctx.response.status = 400;
        return;
      }
      let body: any = await ctx.request.body();
      const { name, email, password, avatar, date } = body.value;
      // check for name
      if (!name) {
        ctx.response.status = 422;
        ctx.response.body = {
          error: {
            message: "Name is required ",
          },
        };
        return;
      }
      // check for email
      if (!email) {
        ctx.response.status = 422;
        ctx.response.body = {
          error: {
            message: "email is required ",
          },
        };
        return;
      }
      // check for password
      if (!password) {
        ctx.response.status = 422;
        ctx.response.body = {
          error: {
            message: "password is required ",
          },
        };
        return;
      }
      // check for date
      if (!date) {
        ctx.response.status = 422;
        ctx.response.body = {
          error: {
            message: "date is required ",
          },
        };
        return;
      }
      // check for avatar
      if (!avatar) {
        ctx.response.status = 422;
        ctx.response.body = {
          error: {
            message: "avatar is required ",
          },
        };
        return;
      }
      //       inserting into the db
      const id = await users.updateOne({ _id: { $oid: ctx.params.id } }, {
        $set: {
          name,
          password,
          avatar,
          date,
          email,
        },
      });

      // sending the response
      ctx.response.body = { message: "Updated" };
      ctx.response.status = 200;
    } catch (error) {
      ctx.response.body = null;
      ctx.response.status = 500;
    }
  },

  // delete user
  async delete(ctx: any) {
    const id = ctx.params.id;
    try {
      if (!id) {
        ctx.response.status = 422;
        ctx.response.body = {
          error: {
            message: "Id is required ",
          },
        };
        return;
      }
      console.log(id);

      await users.deleteOne({ _id: { $oid: id } });
      ctx.response.status = 204;
    } catch (error) {
      ctx.response.body = null;
      ctx.response.status = 500;
    }
  },
};
