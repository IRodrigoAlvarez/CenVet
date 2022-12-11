import { Router } from "express";
import { ClienteController } from "../controllers/cliente.controller";
import { Auth } from "../middleware/auth.middleware";

const router: Router = Router();

router.post(
  "/",
  Auth.accessControl,
  Auth.allowIfLoggedIn,
  ClienteController.crear
);
router.get(
  "/:clienteId",
  Auth.accessControl,
  Auth.allowIfLoggedIn,
  ClienteController.obtener
);
router.get(
  "/",
  Auth.accessControl,
  Auth.allowIfLoggedIn,
  ClienteController.obtenerTodos
);
router.put(
  "/:clienteId",
  Auth.accessControl,
  Auth.allowIfLoggedIn,
  ClienteController.actualizar
);
router.delete(
  "/:clienteId",
  Auth.accessControl,
  Auth.allowIfLoggedIn,
  ClienteController.eliminar
);

export default router;
