import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";
import notFound from "./404.ts";

const app = new Application();
app.use(router.routes());

app.use(notFound);

console.log("server is started at 8000");
await app.listen({ port: 8000 });
