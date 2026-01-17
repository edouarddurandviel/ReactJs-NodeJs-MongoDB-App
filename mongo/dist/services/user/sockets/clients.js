"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reloadUser = void 0;
const socketio_1 = __importDefault(require("@libs/socketio"));
const reloadUser = (userId, params) => {
    const io = socketio_1.default.getInstance();
    return io.emit(`user:${userId}`, params);
};
exports.reloadUser = reloadUser;
