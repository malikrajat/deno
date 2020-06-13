import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/user", (ctx) => {
  ctx.response.body = "Hello Rajat,  You are a confiden person";
})
  .post("/user", async (ctx) => {
    console.log(ctx.request.body());
    const { value } = await ctx.request.body();
    ctx.response.status = 201;
    ctx.response.body = value;
  });

const app = new Application();
app.use(router.routes());

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

console.log("server is started at 8000");
await app.listen({ port: 8000 });
