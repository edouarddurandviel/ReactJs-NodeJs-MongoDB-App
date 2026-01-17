"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const company_1 = __importDefault(require("./company"));
exports.default = (io) => {
    const app = express_1.default.Router({
        mergeParams: false,
        caseSensitive: true,
        strict: true
    });
    app.use("/company", (0, company_1.default)(io));
    app.use("/user", (0, user_1.default)(io));
    return app;
};
