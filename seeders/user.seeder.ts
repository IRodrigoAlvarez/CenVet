import { connect } from "mongoose";
import { ENV } from "../src/config/env.config";
import { User, UserModel } from "../src/models/user.model";
import CryptUtils from "../src/utils/crypt.utils";

export class UserSeeder {
  public static async populate(): Promise<void> {
    let user: User = {
      email: "admin",
      name: "Admin",
      surname: "Admin",
      password: "admin",
    };
    user.password = await CryptUtils.hash(user.password);

    connect(ENV.mongoUrl!)
      .catch((error) => {
        console.log(`MongoDB connection error: ${error}`);
        process.exit(1);
      })
      .then(async () => {
        await UserModel.create(user);
      });
  }
}

UserSeeder.populate();
