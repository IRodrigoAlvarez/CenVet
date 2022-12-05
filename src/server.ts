import express, { NextFunction, Request, Response } from "express";
import { connect } from "mongoose";
import morgan from "morgan";
import { ENV } from "./config/env.config";
import { Auth } from "./middleware/auth.middleware";
import CustomError from "./models/custom-error.model";
import Routes from "./routes/index.routes";

export default class Server {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  static init(port: number) {
    return new Server(port);
  }

  async config(): Promise<void> {
    this.app.use(Auth.accessControl);

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
      );
      res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });

    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use("/api/v1", Routes);

    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        console.error("ERROR:", error);

        if (error instanceof CustomError) {
          res.status(error.httpCode).json(error);
        } else {
          res.status(500).json({
            message: "Fallo en el servidor",
            httpCode: 500,
            internalCode: 0,
            error: error.toString(),
          });
        }
      }
    );
  }

  start(callback: Function) {
    this.config();

    connect(ENV.mongoUrl!)
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((error) => {
        console.log(`MongoDB connection error: ${error}`);
      });

    this.app.listen(this.port, callback());
  }
}
