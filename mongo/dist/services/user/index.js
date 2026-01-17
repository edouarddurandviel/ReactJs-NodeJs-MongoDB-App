"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_json_errors_1 = require("http-json-errors");
const userActions = __importStar(require("./actions"));
const argon2 = __importStar(require("argon2"));
const jwt = __importStar(require("jsonwebtoken"));
class UserController {
    _io;
    constructor(io) {
        this._io = io;
    }
    async getAllUsers() {
        const user = await userActions.getAllUsers();
        return user;
    }
    async createOneUser(data) {
        const passwordHash = await argon2.hash(data.password);
        const dataHash = {
            email: data.email,
            password: passwordHash
        };
        const user = await userActions.createOneUser(dataHash);
        return user;
    }
    async getUserData(userId) {
        const user = (await userActions.getUserData(userId));
        return user;
    }
    async getOneUserWithEmail(email) {
        const user = await userActions.getOneUserWithEmail(email);
        return user;
    }
    async login(authUser) {
        const user = await userActions.getOneUserWithEmail(authUser.email);
        if (await argon2.verify(user.password, authUser.password)) {
            // create jwt token
            const payload = { userId: user._id };
            const secret = authUser.password;
            const token = jwt.sign(payload, secret, { expiresIn: "1h" });
            await userActions.storeUserToken(token, user._id);
            // create private ws connection
            this._io.join(user._id.toString());
            const roles = await userActions.getUserData(user._id.toString());
            const userDetails = {
                user: user,
                role: roles
            };
            return { userDetails, token };
        }
        else {
            throw new http_json_errors_1.Unauthorized("Invalid email or password");
        }
    }
    async logout(userId) {
        const data = (await userActions.getUserTokenWithId(userId));
        const result = await userActions.deleteUserToken(data.user_id);
        return result;
    }
}
exports.default = UserController;
