"use strict";
exports.__esModule = true;
exports.ENV = void 0;
var dotenv = require("dotenv");
dotenv.config();
exports.ENV = {
    port: process.env.PORT || "3001",
    mongoUrl: process.env.MONGODB_URL,
    jwtSecret: process.env.JWT_SECRET
};
