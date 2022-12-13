import { Router } from "express";
import { AgendaController } from "../controllers/agenda.controller";
import { Auth } from "../middleware/auth.middleware";

const router: Router = Router();

router.post("/", Auth.allowIfLoggedIn, AgendaController.crear);
router.get("/", AgendaController.obtener);
router.get("/:agendaId/fechas", AgendaController.obtenerFechas);
router.get("/:agendaId/horas", AgendaController.obtenerHoras);
router.post("/:agendaId/reserva/:horaId", AgendaController.reservarHora);
router.get(
  "/reservas",
  Auth.accessControl,
  Auth.allowIfLoggedIn,
  AgendaController.obtenerReservas
);
router.delete(
  "/reservas/:reservaId",
  Auth.accessControl,
  Auth.allowIfLoggedIn,
  AgendaController.eliminarReserva
);
router.get(
  "/reservas/:numeroReserva",
  AgendaController.obtenerReservaPorNumero
);
router.delete(
  "/reservas/numero/:numeroReserva",
  AgendaController.eliminarReservaPorNumero
);

export default router;
