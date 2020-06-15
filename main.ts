// importing the oak from the url.
import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import token from "./utils/token.ts";

// importing the router
import router from "./routes.ts";

// importing the controllers
import notFound from "./404.ts";

const env = config();
const app = new Application();
// normal routing
app.use(router.routes());
//jwt validation
app.use(async (ctx: any, next) => {
  const authorization = ctx.request.headers.get("Authorization");
  if (!authorization) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthrized" };
    return;
  }
  const headerToken = authorization.replace("Bearer ", "");
  const isTokenValida = await token.validate(headerToken);
  if (!isTokenValida) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthrized" };
    return;
  }
  await next();
});
//proceted route
app.use((ctx: any) => {
  ctx.response.body = "I am protected Route.";
});
app.use(router.allowedMethods());
app.use(notFound);

// Starting the server
const HOST = env.APP_HOST || "http://localhost:";
const PORT = +env.APP_PORT || 4000;
console.log(`server is started at ${HOST} ${PORT}`);
await app.listen({ port: PORT });
