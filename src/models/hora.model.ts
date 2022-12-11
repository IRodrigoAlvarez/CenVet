import { model, Schema } from "mongoose";
import { Agenda } from "./agenda.model";

export interface Hora {
  _id?: string;
  fecha: string;
  bloque: number;
  hora: string;
  disponible: boolean;
  agenda: Schema.Types.ObjectId | Agenda;
}

const HoraSchema = new Schema<Hora>(
  {
    fecha: { type: String, required: true },
    bloque: { type: Number, required: true },
    hora: { type: String, required: true },
    disponible: { type: Boolean, required: true, default: true },
    agenda: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
      ref: "Agenda",
    },
  },
  { timestamps: true }
);

export const HoraModel = model<Hora>("Hora", HoraSchema);
