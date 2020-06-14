import { Router } from "https://deno.land/x/oak/mod.ts";
import UserController from "./controller/UserController.ts";

const router = new Router();

router
  .get("/user", UserController.index)
  .post("/user", UserController.store)
  .get("/user/:id", UserController.show)
  .delete("/user/:id", UserController.delete)
  .patch("/user/:id", UserController.update);

export default router;
