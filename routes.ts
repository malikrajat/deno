// importing the oak from the url.
import { Router } from "https://deno.land/x/oak/mod.ts";
import UserController from "./controller/UserController.ts";

// create new instance
const router = new Router();

// ROUTES
router
  .get("/", UserController.index)
  .post("/user", UserController.store)
  .get("/user/:id", UserController.show)
  .delete("/user/:id", UserController.delete)
  .patch("/user/:id", UserController.update);

export default router;
