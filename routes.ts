import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/user", (ctx) => {
  ctx.response.body = "Hello Rajat,  You are a confiden person";
})
  .post("/user", async (ctx) => {
    console.log(ctx.request.body());
    const { value } = await ctx.request.body();
    ctx.response.status = 201;
    ctx.response.body = value;
  }).get("/user/:id", (ctx) => {
    ctx.response.body = ctx.params.id;
  });
export default router;
