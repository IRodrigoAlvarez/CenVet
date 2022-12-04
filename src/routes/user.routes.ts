import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { Auth } from "../middleware/auth.middleware";

const router: Router = Router();

router.post("/login", UserController.login);

export default router;
