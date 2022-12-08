import { NextFunction, Request, Response } from "express";
import CustomError from "../models/custom-error.model";
import { User, UserModel } from "../models/user.model";
import CryptUtils from "../utils/crypt.utils";
import JwtUtils from "../utils/jwt.utils";

export class UserController {
  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const email: string = req.body.email;
      const password: string = req.body.password;
      const user: User = await UserModel.findOne({ email: email })
        .select("+password")
        .lean();
      if (!user) {
        throw CustomError.EXAMPLE_ERROR;
      }
      const isValid: boolean = await CryptUtils.validateHash(
        password,
        user.password
      );
      if (isValid) {
        const data: any = await JwtUtils.setNewAccessToken(user);
        res.status(200).json({ status: "ok", data: { ...data, ...user } });
      } else {
        throw CustomError.EXAMPLE_ERROR;
      }
    } catch (error: any) {
      next(error);
    }
  }

  public static async check(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const loggedInUserId = res.locals.loggedInUser._id;
      const user: User = await UserModel.findById(loggedInUserId);
      res.status(200).json({ status: "ok", data: user });
    } catch (error: any) {
      next(error);
    }
  }
}
