"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onError = exports.normalizePort = exports.handleErrors = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const handleErrors = async (error) => {
    if (error && error.details && error.details.length) {
        (0, http_errors_1.default)(404, "Error - Must try again");
    }
};
exports.handleErrors = handleErrors;
// Normalize a port into a number, string, or false.
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
exports.normalizePort = normalizePort;
// Event listener for HTTP server "error" event.
const onError = (error, port) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            break;
        default:
            throw error;
    }
};
exports.onError = onError;
