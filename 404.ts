// import { Router } from "https://deno.land/x/oak/mod.ts";
// const router = new Router();
export default (ctx: any) => {
  ctx.response.status = 404;
  ctx.response.body = "Page not found";
};
