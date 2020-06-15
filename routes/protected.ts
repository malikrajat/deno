// importing the oak from the url.
import { Router } from "https://deno.land/x/oak/mod.ts";
import token from "../utils/token.ts";
import db from "../config/db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
// create new instance
const protectedRouter = new Router();
const users = db.collection("users");

// ROUTES

// login routes
protectedRouter.get("/me", async (ctx: any) => {
  const authorization = ctx.request.headers.get("Authorization").replace(
    "Bearer ",
    "",
  );
  const payload = token.fetchUserId(authorization);
  if (payload) {
    const uid = String(payload.iss);
    const user = await users.findOne({ _id: ObjectId(uid) });
    ctx.response.body = user;
  }
});

export default protectedRouter;
