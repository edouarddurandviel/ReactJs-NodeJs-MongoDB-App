"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.company = exports.fullCompany = exports.idSchema = exports.textSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.textSchema = joi_1.default.string().required();
exports.idSchema = joi_1.default.number().required();
exports.fullCompany = joi_1.default.object({
    name: exports.textSchema,
    ref: exports.textSchema,
    isoCode: exports.textSchema
});
exports.company = joi_1.default.object({
    name: joi_1.default.string(),
    ref: joi_1.default.string(),
    isoCode: joi_1.default.string()
});
