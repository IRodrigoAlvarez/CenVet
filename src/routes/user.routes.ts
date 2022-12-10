import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { Auth } from "../middleware/auth.middleware";

const router: Router = Router();

router.post("/login", UserController.login);
router.post(
  "/check",
  Auth.accessControl,
  Auth.allowIfLoggedIn,
  UserController.check
);

export default router;
