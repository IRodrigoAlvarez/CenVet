import { NextFunction, Request, Response } from "express";
import { Cliente, ClienteModel } from "../models/cliente.model";

export class ClienteController {
  public static async crear(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const datosCliente: Cliente = req.body;
      const cliente: Cliente = await ClienteModel.create(datosCliente);
      res.status(200).json({ status: "ok", data: cliente });
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
      const clienteId: string = req.params.clienteId.toString();
      const cliente: Cliente = await ClienteModel.findById(clienteId);
      res.status(200).json({ status: "ok", data: cliente });
    } catch (error: any) {
      next(error);
    }
  }

  public static async obtenerTodos(
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
      let query: any = {};
      const offset: number = (pagina - 1) * limite;
      const clientes: Cliente[] = await ClienteModel.find(query)
        .skip(offset)
        .limit(limite)
        .sort();
      const total: number = await ClienteModel.countDocuments(query);
      res
        .status(200)
        .json({ status: "ok", data: { clientes, pagina, limite, total } });
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
      const datosCliente: Cliente = req.body;
      const clienteId: string = req.params.clienteId.toString();
      const cliente: Cliente = await ClienteModel.findByIdAndUpdate(
        clienteId,
        datosCliente,
        { new: true }
      );
      res.status(200).json({ status: "ok", data: cliente });
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
      const clienteId: string = req.params.clienteId.toString();
      await ClienteModel.findByIdAndDelete(clienteId);
      res.status(200).json({ status: "ok" });
    } catch (error: any) {
      next(error);
    }
  }
}
