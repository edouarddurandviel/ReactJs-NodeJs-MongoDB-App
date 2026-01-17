"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./_config/app"));
const socketio_1 = __importDefault(require("@libs/socketio"));
const server_1 = require("@libs/server");
const v1_1 = __importDefault(require("./_routes/v1"));
const isEnv_1 = require("./_config/isEnv");
// Get port from environment and store in Express.
const port = (0, server_1.normalizePort)(process.env.PORT || "3000");
app_1.default.set("port", port);
// Create HTTP server.
const server = http_1.default.createServer(app_1.default);
// Initialize With an HTTP server.
const origin = (0, isEnv_1.isEnv)("github") ? "5173" : "4173";
const io = socketio_1.default.init(server, {
    path: "/socket",
    cors: {
        origin: [`http://localhost:${origin}`]
    }
});
// Send io instance through routes
app_1.default.use((0, v1_1.default)(io));
// Listen on provided port, on all network interfaces.
server.listen(port);
// EACCES require elevated privileges - EADDRINUSE already in use
server.on("error", (error) => {
    (0, server_1.onError)(error, port);
});
// Must be an address to listen
server.on("listening", () => {
    const addr = server.address();
    if (addr) {
        const bind = typeof addr === "string" ? "pipe " + addr : addr.port;
        console.info(`[Listening] on http://localhost: ${bind}`);
    }
});
exports.default = server;
