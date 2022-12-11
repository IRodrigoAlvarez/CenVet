import { model, Schema } from "mongoose";

export interface Cliente {
  _id?: string;
  nombre: string;
  telefono: string;
  email: string;
  rut: string;
  direccion: string;
}

const ClienteSchema = new Schema<Cliente>(
  {
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    rut: { type: String, required: true },
    direccion: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export const ClienteModel = model<Cliente>("Cliente", ClienteSchema);
