// importing the oak from the url.
import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import authModdleware from "./middleware/auth.ts";

// importing the router
import router from "./routes/normal.ts";
import protectedRouter from "./routes/protected.ts";

// importing the controllers
import notFound from "./404.ts";
// const env = Deno.env.toObject(); // to access system env variable
const { APP_HOST, APP_PORT } = config({ safe: true });

const app = new Application();
// normal routing
app.use(router.routes());
//jwt validation
app.use((ctx, next) => authModdleware.authorized(ctx, next));
//proceted route
app.use(protectedRouter.routes());
app.use(router.allowedMethods());
app.use(notFound);

// Starting the server
const HOST = APP_HOST || "http://localhost:";
const PORT = +APP_PORT || 4000;
console.log(`server is started at ${HOST} ${PORT}`);
await app.listen({ port: PORT });
