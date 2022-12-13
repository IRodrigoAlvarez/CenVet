import { NextFunction, Request, Response } from "express";
import { customAlphabet } from "nanoid";
import { Agenda, AgendaModel } from "../models/agenda.model";
import CustomError from "../models/custom-error.model";
import { Hora, HoraModel } from "../models/hora.model";
import { Reserva, ReservaModel } from "../models/reserva.model";
import CorreoUtils from "../utils/correo.utils";
import MiscUtils from "../utils/misc.utils";

export class AgendaController {
  public static async crear(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const datos: Agenda = req.body;
      const agenda: Agenda = await AgendaModel.create(datos);
      res.status(200).json({ status: "ok", data: agenda });
    } catch (error: any) {
      next(error);
    }
  }

  public static async obtener(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const agendas: Agenda[] = await AgendaModel.find();
      res.status(200).json({ status: "ok", data: agendas });
    } catch (error: any) {
      next(error);
    }
  }

  public static async obtenerFechas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const today = new Date();
      const año: number = req.query.año
        ? parseInt(req.query.año.toString())
        : today.getFullYear();
      const mes: number = req.query.mes
        ? parseInt(req.query.mes.toString())
        : today.getMonth() + 1;
      const agendaId: string = req.params.agendaId;

      const fechasMes = MiscUtils.obtenerDiasPorMes(mes - 1, año);
      let fechas: any[] = [];

      for (let fecha of fechasMes) {
        let horaReserva: Hora = await HoraModel.findOne({
          fecha: fecha,
          disponible: true,
          agenda: agendaId,
        });
        const disponible: boolean = horaReserva != null;
        fechas.push({ fecha, disponible });
      }

      res.status(200).json({ status: "ok", data: fechas });
    } catch (error: any) {
      next(error);
    }
  }

  public static async obtenerHoras(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const today = new Date();
      const año: number = req.query.año
        ? parseInt(req.query.año.toString())
        : today.getFullYear();
      let mes: string = req.query.mes
        ? req.query.mes.toString()
        : "" + today.getMonth() + 1;
      let dia: string = req.query.dia
        ? req.query.dia.toString()
        : "" + today.getDay() + 3;
      const agendaId: string = req.params.agendaId;
      const fecha = `${año}-${mes}-${dia}`;
      const horas = await HoraModel.find({ fecha, agenda: agendaId });
      res.status(200).json({ status: "ok", data: horas });
    } catch (error: any) {
      next(error);
    }
  }

  public static async reservarHora(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const horaId: string = req.params.horaId.toString();
      const hora: Hora = await HoraModel.findById(horaId);

      if (!hora) {
        throw CustomError.EXAMPLE_ERROR;
      }
      const agendaId: string = req.params.agendaId.toString();
      const nanoid = customAlphabet("1234567890", 10);
      const data: any = {
        numero: nanoid(),
        fecha: hora.fecha,
        bloque: hora.bloque,
        hora: hora.hora,
        nombreMascota: req.body.nombreMascota,
        especie: req.body.especie,
        sexo: req.body.sexo,
        edad: req.body.edad,
        nombreApoderado: req.body.nombreApoderado,
        rut: req.body.rut,
        email: req.body.email,
        telefono: req.body.telefono,
        responsable: req.body.responsable,
        agenda: agendaId,
        cita: horaId,
      };

      const reserva: Reserva = await (
        await ReservaModel.create(data)
      ).populate("agenda");

      await HoraModel.updateOne({ _id: horaId }, { disponible: false });

      CorreoUtils.enviarCorreo(reserva);

      res.status(200).json({ status: "ok", data: reserva });
    } catch (error: any) {
      next(error);
    }
  }

  public static async obtenerReservas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const pagina: number = req.query.pagina
        ? parseInt(req.query.pagina.toString())
        : 1;
      const limite: number = req.query.limite
        ? parseInt(req.query.limite.toString())
        : 10;
      const offset: number = (pagina - 1) * limite;
      const reservas: Reserva[] = await ReservaModel.find()
        .populate("agenda")
        .populate("cita")
        .skip(offset)
        .limit(limite)
        .sort([
          ["fecha", 1],
          ["hora", 1],
        ]);
      const total: number = await ReservaModel.countDocuments();
      res
        .status(200)
        .json({ status: "ok", data: { reservas, pagina, limite, total } });
    } catch (error: any) {
      next(error);
    }
  }

  public static async eliminarReserva(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reservaId: string = req.params.reservaId.toString();
      await ReservaModel.findByIdAndDelete(reservaId);
      res.status(200).json({ status: "ok" });
    } catch (error: any) {
      next(error);
    }
  }

  public static async obtenerReservaPorNumero(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const numeroReserva: string = req.params.numeroReserva.toString();
      const reserva: Reserva = await ReservaModel.findOne({
        numero: numeroReserva,
      })
        .populate("agenda")
        .populate("cita");
      res.status(200).json({ status: "ok", data: reserva });
    } catch (error: any) {
      next(error);
    }
  }

  public static async eliminarReservaPorNumero(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const numeroReserva: string = req.params.numeroReserva.toString();
      await ReservaModel.findOneAndDelete({ numero: numeroReserva });
      res.status(200).json({ status: "ok" });
    } catch (error: any) {
      console.log("error", error);
      next(error);
    }
  }
}
