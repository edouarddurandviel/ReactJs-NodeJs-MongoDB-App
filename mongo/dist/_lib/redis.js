"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
const redisClient = async () => {
    const client = await (0, redis_1.createClient)({ url: "redis://localhost:6379" })
        .on("error", err => console.log("Redis Client Error", err))
        .connect();
    return client;
};
exports.redisClient = redisClient;
