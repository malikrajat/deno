import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";

const app = new Application();
app.use(router.routes());

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

console.log("server is started at 8000");
await app.listen({ port: 8000 });
