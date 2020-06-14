import { trim } from "https://deno.land/x/dotenv/util.ts";

export default {
  async Validate(ctx: any) {
    let body: any = await ctx.request.body();
    const { value } = body;
    const fields = ["name", "email", "password", "avatar", "date"];
    for (let index = 0; index < fields.length; index++) {
      const element = trim(value[fields[index]]);
      if (!element || element.length < 1) {
        ctx.response.status = 422;
        ctx.response.body = {
          error: {
            message: `${fields[index]} is required `,
          },
        };
        return false;
      }
    }
    return true;
  },
};
