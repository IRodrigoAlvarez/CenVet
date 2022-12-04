"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true, select: false }
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
