"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEnv = void 0;
// Demonstration code purpose only
const isEnv = (origin) => {
    const env = process.env.NODE_ENV;
    return env && env.toString().trim() === origin ? true : false;
};
exports.isEnv = isEnv;
