"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userId = exports.userAuth = exports.user = exports.idSchema = exports.uidSchema = exports.textSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.textSchema = joi_1.default.string().required();
exports.uidSchema = joi_1.default.string().required();
exports.idSchema = joi_1.default.number().required();
exports.user = joi_1.default.object({
    email: exports.textSchema,
    password: exports.textSchema,
    name: joi_1.default.string().allow(null)
});
exports.userAuth = joi_1.default.object({
    email: exports.textSchema,
    password: exports.textSchema
});
exports.userId = joi_1.default.string().max(80).required();
