import { Router } from "express";
import { RegistroController } from "../controllers/registro.controller";
import { Auth } from "../middleware/auth.middleware";

const router: Router = Router();

router.post(
  "/",
  Auth.accessControl,
  Auth.allowIfLoggedIn,
  RegistroController.crear
);
router.get(
  "/mascota/:mascotaId",
  Auth.accessControl,
  Auth.allowIfLoggedIn,
  RegistroController.obtenerPorMascota
);
router.put(
  "/:registroId",
  Auth.accessControl,
  Auth.allowIfLoggedIn,
  RegistroController.actualizar
);
router.delete(
  "/:registroId",
  Auth.accessControl,
  Auth.allowIfLoggedIn,
  RegistroController.eliminar
);

export default router;
