"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remotePostAccess = void 0;
const cors_1 = __importDefault(require("cors"));
const remote_1 = __importDefault(require("../_config/remote"));
const remotePostAccess = () => {
    const whitelist = remote_1.default.domains;
    (0, cors_1.default)({
        origin: (origin, callback) => {
            if (whitelist && whitelist.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["POST"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        maxAge: 3600
    });
};
exports.remotePostAccess = remotePostAccess;
