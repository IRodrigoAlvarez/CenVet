import { NextFunction, Request, Response } from "express";
import { Agenda, AgendaModel } from "../models/agenda.model";
import CustomError from "../models/custom-error.model";
import { Hora, HoraModel } from "../models/hora.model";
import { Reserva, ReservaModel } from "../models/reserva.model";
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
      const data: any = {
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

      res.status(200).json({ status: "ok", data: reserva });
    } catch (error: any) {
      next(error);
    }
  }
}
