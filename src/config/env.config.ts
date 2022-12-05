import * as dotenv from "dotenv";

dotenv.config();

export const ENV = {
  port: process.env.PORT || "3001",
  mongoUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
};
