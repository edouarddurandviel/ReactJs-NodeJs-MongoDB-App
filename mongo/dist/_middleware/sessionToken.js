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
exports.sessionToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const http_json_errors_1 = require("http-json-errors");
const userActions = __importStar(require("@services/user/actions"));
const sessionToken = async (req, res, next) => {
    try {
        const user = await userActions.getUserToken(req.cookies.jwt);
        if (user) {
            // should check user in DB
            const decode = (await jwt.decode(user.token));
            const isValid = new Date(decode.exp).getTime() > new Date().getTime();
            if (isValid) {
                req.user = { id: user._id };
                next();
            }
            else {
                throw new http_json_errors_1.NotFound("Session expiry");
            }
        }
        else {
            throw new http_json_errors_1.NotFound("Unauthorized session token");
        }
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
};
exports.sessionToken = sessionToken;
