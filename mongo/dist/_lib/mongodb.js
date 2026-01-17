"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbase = exports.inCollection = exports.closeDatabase = exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const mongodb_2 = __importDefault(require("../_config/mongodb"));
const isEnv_1 = require("../_config/isEnv");
const dbName = mongodb_2.default.db || "test";
const uri = (0, isEnv_1.isEnv)("github")
    ? "mongodb://root:edouard@localhost:27017/test?authSource=admin"
    : mongodb_2.default.uri || "mongodb://localhost:27017";
let client;
let db;
const connectToDatabase = async () => {
    if (db)
        return;
    client = new mongodb_1.MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    return db;
};
exports.connectToDatabase = connectToDatabase;
const closeDatabase = async () => {
    if (client) {
        await client.close();
    }
};
exports.closeDatabase = closeDatabase;
const inCollection = async (collection) => {
    const list = await db.collection(collection);
    return list;
};
exports.inCollection = inCollection;
const dbase = async () => {
    console.log(db);
    return db;
};
exports.dbase = dbase;
