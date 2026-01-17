"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reloadCompanies = exports.reloadCompany = void 0;
const socketio_1 = __importDefault(require("@libs/socketio"));
const reloadCompany = (userId, params) => {
    const io = socketio_1.default.getInstance();
    return io.emit(`company:${userId}`, params);
};
exports.reloadCompany = reloadCompany;
const reloadCompanies = () => {
    const io = socketio_1.default.getInstance();
    return io.emit(`company`);
};
exports.reloadCompanies = reloadCompanies;
