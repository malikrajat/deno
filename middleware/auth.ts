import token from "../utils/token.ts";
export default {
  async authorized(ctx: any, next: any) {
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
  },
};
