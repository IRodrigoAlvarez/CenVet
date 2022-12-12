import { model, Schema } from "mongoose";
import { Mascota } from "./mascota.model";

export interface Registro {
  _id?: string;
  diagnostico: string;
  fecha: Date;
  motivo: string;
  tratamiento: string;
  mascota: Schema.Types.ObjectId | Mascota;
}

const RegistroSchema = new Schema<Registro>(
  {
    diagnostico: { type: String, required: true },
    fecha: { type: Date, required: true },
    motivo: { type: String, required: true },
    tratamiento: { type: String, required: true },
    mascota: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
      ref: "Mascota",
    },
  },
  { timestamps: true }
);

export const RegistroModel = model<Registro>("Registro", RegistroSchema);
