export default {
  index(ctx: any) {
    ctx.response.body = "Hello Rajat,  You are a confiden person";
  },
  show(ctx: any) {
    ctx.response.body = ctx.params.id;
  },
  async store(ctx: any) {
    console.log(ctx.request.body());
    const { value } = await ctx.request.body();
    ctx.response.status = 201;
    ctx.response.body = value;
  },
  update(ctx: any) {},
  delete(ctx: any) {},
};
