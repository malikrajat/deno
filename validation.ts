import { trim } from "https://deno.land/x/dotenv/util.ts";

export default {
  async Validate(ctx: any) {
    let errors: any = [];
    let status;
    let body: any = await ctx.request.body();
    const { value } = body;
    const fields = ["name", "email", "password", "avatar", "date"];
    for (let index = 0; index < fields.length; index++) {
      const element = value[fields[index]];
      if (!element || trim(element).length < 1) {
        errors.push({ [fields[index]]: `${fields[index]} is required ` });
        status = 422;
      }
    }
    if (status) {
      ctx.response.body = { errors };
      return false;
    }
    return true;
  },
};
