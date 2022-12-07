import { model, Schema } from "mongoose";
import { Agenda } from "./agenda.model";
import { Hora } from "./hora.model";

export interface Reserva {
  _id?: string;
  fecha: string;
  bloque: number;
  hora: string;
  nombreMascota: string;
  especie: string;
  sexo: string;
  edad: string;
  nombreApoderado: string;
  rut: string;
  email: string;
  telefono: string;
  responsable: string;
  agenda: Schema.Types.ObjectId | Agenda;
  cita: Schema.Types.ObjectId | Hora;
}

const ReservaSchema = new Schema<Reserva>(
  {
    fecha: { type: String, required: true },
    bloque: { type: Number, required: true },
    hora: { type: String, required: true },
    nombreMascota: { type: String, required: true },
    especie: { type: String, required: true },
    sexo: { type: String, required: true },
    edad: { type: String, required: true },
    nombreApoderado: { type: String, required: true },
    rut: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    responsable: { type: String, required: false },
    agenda: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
      ref: "Agenda",
    },
    cita: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
      ref: "Hora",
    },
  },
  { timestamps: true }
);

export const ReservaModel = model<Reserva>("Reserva", ReservaSchema);
