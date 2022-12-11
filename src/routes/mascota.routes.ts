import { Router } from "express";
import { MascotaController } from "../controllers/mascota.controller";
import { Auth } from "../middleware/auth.middleware";

const router: Router = Router();

router.post(
  "/",
  Auth.accessControl,
  Auth.allowIfLoggedIn,
  MascotaController.crear
);
router.get(
  "/cliente/:clienteId",
  Auth.accessControl,
  Auth.allowIfLoggedIn,
  MascotaController.obtenerPorCliente
);

export default router;
