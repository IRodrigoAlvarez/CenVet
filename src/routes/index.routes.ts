import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import UserRoutes from "./user.routes";
import AgendaRoutes from "./agenda.routes";

const router: Router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: "CenVet API",
    version: "v1",
  });
});

router.use("/agenda", AgendaRoutes);
router.use("/users", UserRoutes);

export default router;
