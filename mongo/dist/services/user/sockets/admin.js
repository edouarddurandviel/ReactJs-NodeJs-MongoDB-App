"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socketio_1 = __importDefault(require("@libs/socketio"));
class UserAdminSocket {
    _io;
    constructor() {
        this._io = socketio_1.default.getInstance();
    }
    refreshUser(userId, params) {
        return this._io.emit(`user:${userId}`, params);
    }
    refreshUserAddress(number, addrId, params) {
        return this._io.emit(`user:${addrId}:address`, params);
    }
    closeConnection() {
        return this._io.close();
    }
}
exports.default = UserAdminSocket;
