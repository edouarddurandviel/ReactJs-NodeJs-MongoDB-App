"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socketio_1 = __importDefault(require("@libs/socketio"));
class CompanyAdminSocket {
    _io;
    constructor() {
        this._io = socketio_1.default.getInstance();
    }
    refreshCompany(userId, params) {
        return this._io.emit(`company:${userId}`, params);
    }
    refreshCompanyAddress(number, addrId, params) {
        return this._io.emit(`address:${addrId}`, params);
    }
    closeConnection() {
        return this._io.close();
    }
}
exports.default = CompanyAdminSocket;
