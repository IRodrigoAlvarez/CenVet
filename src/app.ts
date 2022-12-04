import Server from "./server";
import { ENV } from "./config/env.config";

export const server = Server.init(parseInt(ENV.port));

server.start(() => {
  console.log("Server running at port " + server.port);
});
