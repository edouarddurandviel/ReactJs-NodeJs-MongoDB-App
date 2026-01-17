"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("@libs/mongodb");
require("dotenv/config");
const isEnv_1 = require("./isEnv");
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use((0, helmet_1.default)());
// `cross scripting
// Content-Security-Policy:
// default-src 'self';
// base-uri 'self';
// font-src 'self' https: data:;
// form-action 'self';
// frame-ancestors 'self';
// img-src 'self' data:;
// object-src 'none';
// script-src 'self';
// script-src-attr 'none';
// style-src 'self' https: 'unsafe-inline';
// upgrade-insecure-requests`
// X-Content-Type-Options: nosniff (hide content-type)
// X-Download-Options: noopen (unsafe downloads)
// X-Frame-Options: SAMEORIGIN (old browsers click jacking) overheaded by frame-ancestors Content Security Policy
// X-Permitted-Cross-Domain-Policies: none
// X-XSS-Protection: 0
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
const origin = (0, isEnv_1.isEnv)("github") ? "5173" : "4173";
app.use((0, cors_1.default)({
    origin: `http://localhost:${origin}` // allow frontend origin
}));
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
const db = (0, mongodb_1.connectToDatabase)();
db.then(c => c && console.info("Connected to MongoDB")).catch(e => e && console.error(e));
exports.default = app;
