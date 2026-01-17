"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const companyActions = __importStar(require("./actions"));
const companySockets = __importStar(require("./sockets/clients"));
const admin_1 = __importDefault(require("./sockets/admin"));
const getObject_1 = require("../aws/s3/getObject");
const redis_1 = require("@libs/redis");
const path_1 = __importDefault(require("path"));
const promises_1 = require("fs/promises");
class CompanyController {
    _io;
    admin;
    constructor(io) {
        this._io = io;
        this.admin = new admin_1.default();
    }
    async getDocuments() {
        const documents = await (0, getObject_1.getObject)("test", "document.jpg");
        return documents;
    }
    async getOneCompany(companyId) {
        const result = await companyActions.findOne(companyId);
        return result;
    }
    async getCompanies() {
        const companies = await companyActions.getAll();
        // const client = await redisClient();
        // client.hSet("myKey:01", { text: "Count" }); // encrypted content
        // const getHelloResult = (await client.exists("myKey")) && (await client.get("myKey"));
        // const mGetResult = await client.mGet(["myKey", "nonExistentKey"]);
        // // ObjectId increment with a value
        // const incrResult = await client.incr("myKeyCount");
        // console.log(mGetResult); // ["Hello", null]
        // console.log(incrResult);
        // const scanOptions = {
        //   TYPE: "string", // type of data
        //   MATCH: "my*", // any item stating with my prefix.
        //   COUNT: 2 // number of items.
        // };
        // const cursor: RedisArgument = "0"; // items position in tree
        // const scanResult = await client.scan(cursor, scanOptions);
        // const keys = scanResult.keys;
        // const hget = await client.hGet("myKey:01", "text");
        return companies;
    }
    async createOneCompany(company) {
        await companyActions.createOne(company);
        const client = await (0, redis_1.redisClient)();
        client.set("myKey", "Counter");
        client.hSet("myKey:01", { text: "Counter" });
        companySockets.reloadCompanies();
    }
    async updateOneCompany(companyId, data) {
        await companyActions.updateOne(companyId, data);
        companySockets.reloadCompanies();
    }
    async updateManyCompanies(companyId, data) {
        await companyActions.updateMany(companyId, data);
        companySockets.reloadCompany(1, {
            params: {
                userId: 1
            }
        });
    }
    async replaceOneCompany(companyId, data) {
        await companyActions.replaceOne(companyId, data);
        companySockets.reloadCompanies();
    }
    async deleteOneCompany(companyId) {
        await companyActions.deleteOne(companyId);
        companySockets.reloadCompanies();
    }
    async getCompanyLogs() {
        const docPath = path_1.default.resolve("isolate-000001A595F92050-14492-v8.log");
        const doc = await (0, promises_1.open)(docPath);
        for await (const line of doc.readLines()) {
            console.log(line);
        }
        return doc;
    }
}
exports.default = CompanyController;
