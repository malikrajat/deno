// importing the oak from the url.
import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

// importing the router
import router from "./routes.ts";

// importing the controllers
import notFound from "./404.ts";

const env = config();
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);

// Starting the server
const HOST = env.APP_HOST || "http://localhost:";
const PORT = +env.APP_PORT || 4000;
console.log(`server is started at ${HOST} ${PORT}`);
await app.listen({ port: PORT });
