"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObject = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const minio_1 = __importDefault(require("../../../_config/minio"));
const getObject = async (bucketName, key) => {
    const client = new client_s3_1.S3Client({});
    try {
        const response = await client.send(new client_s3_1.GetObjectCommand({
            Bucket: minio_1.default.buckets.test,
            Key: "my-document.jpg"
        }));
        if (response.Body)
            return response.Body.transformToString();
    }
    catch (caught) {
        if (caught instanceof client_s3_1.NoSuchKey) {
            console.error(`No such key from bucket: ${bucketName}`);
        }
        else if (caught instanceof client_s3_1.S3ServiceException) {
            console.error(`${caught.name}: ${caught.message}`);
        }
        else {
            throw caught;
        }
    }
};
exports.getObject = getObject;
