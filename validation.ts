export default {
  async Validate(ctx: any) {
    let body: any = await ctx.request.body();
    const { name, email, password, avatar, date } = body.value;
    // check for name
    if (!name) {
      ctx.response.status = 422;
      ctx.response.body = {
        error: {
          message: "Name is required ",
        },
      };
      return;
    }
    // check for email
    if (!email) {
      ctx.response.status = 422;
      ctx.response.body = {
        error: {
          message: "email is required ",
        },
      };
      return;
    }
    // check for password
    if (!password) {
      ctx.response.status = 422;
      ctx.response.body = {
        error: {
          message: "password is required ",
        },
      };
      return;
    }
    // check for date
    if (!date) {
      ctx.response.status = 422;
      ctx.response.body = {
        error: {
          message: "date is required ",
        },
      };
      return;
    }
    // check for avatar
    if (!avatar) {
      ctx.response.status = 422;
      ctx.response.body = {
        error: {
          message: "avatar is required ",
        },
      };
      return;
    }
    return true;
  },
};
