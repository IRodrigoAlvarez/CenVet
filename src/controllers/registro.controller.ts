import { NextFunction, Request, Response } from "express";
import { Cliente, ClienteModel } from "../models/cliente.model";
import { Registro, RegistroModel } from "../models/registro.model";

export class RegistroController {
  public static async crear(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const datosRegistro: Registro = req.body;
      const registro: Registro = await RegistroModel.create(datosRegistro);
      res.status(200).json({ status: "ok", data: registro });
    } catch (error: any) {
      next(error);
    }
  }

  public static async obtenerPorMascota(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mascotaId: string = req.params.mascotaId.toString();
      const pagina: number = req.query.pagina
        ? parseInt(req.query.pagina.toString())
        : 1;
      const limite: number = req.query.limite
        ? parseInt(req.query.limite.toString())
        : 10;
      let query: any = { mascota: mascotaId };
      const offset: number = (pagina - 1) * limite;
      const registros: Registro[] = await RegistroModel.find(query)
        .skip(offset)
        .limit(limite)
        .sort();
      const total: number = await RegistroModel.countDocuments(query);
      res
        .status(200)
        .json({ status: "ok", data: { registros, pagina, limite, total } });
    } catch (error: any) {
      next(error);
    }
  }

  public static async actualizar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const registroId: string = req.params.registroId.toString();
      const datosRegistro: Registro = req.body;
      const registro: Registro = await RegistroModel.findByIdAndUpdate(
        registroId,
        datosRegistro,
        { new: true }
      );
      res.status(200).json({ status: "ok", data: registro });
    } catch (error: any) {
      next(error);
    }
  }

  public static async eliminar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const registroId: string = req.params.registroId.toString();
      await RegistroModel.findByIdAndDelete(registroId);
      res.status(200).json({ status: "ok" });
    } catch (error: any) {
      next(error);
    }
  }
}
