"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberSchema = exports.textSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.textSchema = joi_1.default.string().required();
exports.numberSchema = joi_1.default.number().required();
