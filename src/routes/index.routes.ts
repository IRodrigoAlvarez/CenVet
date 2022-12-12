import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import UserRoutes from "./user.routes";
import AgendaRoutes from "./agenda.routes";
import ClienteRoutes from "./cliente.routes";
import MascotaRoutes from "./mascota.routes";
import RegistroRoutes from "./registro.routes";

const router: Router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: "CenVet API",
    version: "v1",
  });
});

router.use("/agenda", AgendaRoutes);
router.use("/users", UserRoutes);
router.use("/clientes", ClienteRoutes);
router.use("/mascotas", MascotaRoutes);
router.use("/registros", RegistroRoutes);

export default router;
