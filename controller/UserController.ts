import db from "../config/db.ts";
import Validation from "../validation.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import hashPassword from "../utils/hashPassword.ts";

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
      const data: any = await users.findOne({ _id: ObjectId(id) });
      if (data) { // Response if friend is found
        ctx.response.body = data;
        ctx.response.status = 200;
      } else { // Response if no friend exits with the given id
        ctx.response.body = "not found";
        ctx.response.status = 204;
      }
    } // if some error occured while searching the db
    catch (e) {
      ctx.response.body = { message: "There is user with this id." };
      ctx.response.status = 500;
    }
  },

  // insert user in DB
  async store(ctx: any) {
    try {
      // acessing data from the request body

      const validationCheck = await Validation.Validate(ctx);
      if (validationCheck) {
        let body: any = await ctx.request.body();
        const { value } = body;
        // value.date = new Date().toLocaleString();
        // value.date = new Date();
        value.date = parseInt((new Date().getTime() / 1000).toString());
        value.password = await hashPassword.bcrypt(value.password);
        const id = await users.insertOne({ value });
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
      const validationCheck = await Validation.Validate(ctx);
      if (validationCheck) {
        let body: any = await ctx.request.body();
        const { value } = body;
        // update into the db
        const id = await users.updateOne(
          { _id: ObjectId(ctx.params.id) },
          { $set: { value } },
        );
        // sending the response
        ctx.response.body = { message: "Updated" };
        ctx.response.status = 200;
      }
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
      await users.deleteOne({ _id: ObjectId(id) });
      ctx.response.status = 204;
    } catch (e) {
      ctx.response.body = { message: "There is user with this id." };
      ctx.response.status = 500;
    }
  },
};
