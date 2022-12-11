import { model, Schema } from "mongoose";
import { Cliente } from "./cliente.model";

export interface Mascota {
  _id?: string;
  nombre: string;
  peso: number;
  raza: string;
  especie: string;
  sexo: string;
  fechaNacimiento: Date;
  apoderado: Schema.Types.ObjectId | Cliente;
}

const MascotaSchema = new Schema<Mascota>(
  {
    nombre: { type: String, required: true },
    peso: { type: Number, required: true },
    raza: { type: String, required: true },
    especie: { type: String, required: true },
    sexo: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    apoderado: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
      ref: "Cliente",
    },
  },
  { timestamps: true }
);

export const MascotaModel = model<Mascota>("Mascota", MascotaSchema);
