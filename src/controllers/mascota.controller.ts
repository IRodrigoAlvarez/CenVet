import { NextFunction, Request, Response } from "express";
import { Mascota, MascotaModel } from "../models/mascota.model";

export class MascotaController {
  public static async crear(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const datosMascota: Mascota = req.body;
      const mascota: Mascota = await MascotaModel.create(datosMascota);
      res.status(200).json({ status: "ok", data: mascota });
    } catch (error: any) {
      next(error);
    }
  }

  public static async obtenerPorCliente(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const clienteId: string = req.params.clienteId.toString();
      const mascotas: Mascota[] = await MascotaModel.find({
        apoderado: clienteId,
      });
      res.status(200).json({ status: "ok", data: mascotas });
    } catch (error: any) {
      next(error);
    }
  }
}
