import db from "../config/db.ts";
import Validation from "../validation.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import hashPassword from "../utils/hashPassword.ts";
import validation from "../validation.ts";

// Declare the collections here. Here we are using only one collection (i.e friends).
const users = db.collection("users");

// This is the function that adds a friend to the database.
export default {
  async login(ctx: any) {
    const value = await validation.LoginValidate(ctx);
    if (value) {
      const user = await users.findOne({ email: value.email });
      let passwordMatched = false;
      if (user) {
        passwordMatched = await hashPassword.verify(
          user.password,
          value.password,
        );
        if (passwordMatched) {
          ctx.response.body = user;
        } else {
          ctx.response.body = {
            error: "Password does't match with our records.",
          };
        }
      } else {
        ctx.response.body = {
          error: "Credentials does't match with our records.",
        };
      }
      // ctx.response.body = passwordMatched;
    }
  },
};
