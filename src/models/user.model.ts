import { model, Schema } from "mongoose";

export interface User {
  _id?: string;
  email: string;
  name: string;
  surname: string;
  password: string;
}

const UserSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

export const UserModel = model<User>("User", UserSchema);
