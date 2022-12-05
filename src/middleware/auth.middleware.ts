import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config";
import CustomError from "../models/custom-error.model";

export class Auth {
  public static async accessControl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      var accessToken = req.headers["authorization"];
      if (accessToken) {
        // Handling valid token
        if (!accessToken.startsWith("Bearer ")) {
          return next(CustomError.EXAMPLE_ERROR);
        }
        accessToken = accessToken.slice(7, accessToken.length);
        // Handling logged in user
        const tokenData: any = jwt.verify(
          accessToken,
          ENV.jwtSecret as jwt.Secret
        );
        res.locals.loggedInUser = { _id: tokenData.userId };
        next();
      } else {
        // Just pass if no auth token provided
        next();
      }
    } catch (error: any) {
      next(error);
    }
  }

  public static async allowIfLoggedIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = res.locals.loggedInUser;
      if (user) {
        next();
      } else {
        next(CustomError.EXAMPLE_ERROR);
      }
    } catch (error: any) {
      next(error);
    }
  }
}
