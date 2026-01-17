"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbase = exports.connectionEnd = exports.getConnection = exports.poolConnection = exports.connectToDatabase = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
// import config from "../_config/mongoDb";
// const uri = config.uri || "http//localhost:27017";
// const dbName = config.db || "test";
let mysqlClient;
let pool;
const connectToDatabase = async () => {
    if (mysqlClient)
        return;
    const access = {
        host: "localhost",
        user: "root",
        database: "test"
    };
    mysqlClient = await promise_1.default.createConnection(access);
    return mysqlClient;
};
exports.connectToDatabase = connectToDatabase;
const poolConnection = async () => {
    if (pool)
        return;
    pool = await promise_1.default.createPool({
        host: "localhost",
        user: "root",
        database: "test",
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    });
    return pool;
};
exports.poolConnection = poolConnection;
const getConnection = async (query, bindParams) => {
    // For pool initialization, see above
    const conn = await pool.getConnection();
    return async () => {
        // Do something with the connection
        await conn.query(query, bindParams);
        // Don't forget to release the connection when finished!
        pool.releaseConnection(conn);
    };
};
exports.getConnection = getConnection;
const connectionEnd = async () => {
    if (mysqlClient) {
        await mysqlClient.end();
    }
};
exports.connectionEnd = connectionEnd;
const dbase = async () => {
    return mysqlClient;
};
exports.dbase = dbase;
