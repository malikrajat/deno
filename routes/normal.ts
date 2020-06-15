// importing the oak from the url.
import { Router } from "https://deno.land/x/oak/mod.ts";
import UserController from "../controller/UserController.ts";
import AuthController from "../controller/AuthController.ts";

// create new instance
const router = new Router();

// ROUTES
router
  .get("/", UserController.index)
  .post("/user", UserController.store)
  .get("/user/:id", UserController.show)
  .delete("/user/:id", UserController.delete)
  .patch("/user/:id", UserController.update);

// login routes
router.post("/login", AuthController.login);

export default router;
