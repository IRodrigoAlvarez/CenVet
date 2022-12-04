import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config";
import { User, UserModel } from "../models/user.model";

export default class JwtUtils {
  public static async setNewAccessToken(user: User): Promise<any> {
    const accessToken: string = jwt.sign(
      {
        userId: user._id,
        type: "access",
      },
      ENV.jwtSecret as jwt.Secret,
      { expiresIn: "1d" }
    );
    const decoded: any = jwt.verify(accessToken, ENV.jwtSecret as jwt.Secret);
    return { id: user._id, accessToken, expiration: decoded.exp };
  }
}
