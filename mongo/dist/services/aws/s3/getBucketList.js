"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBucketList = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const getBucketList = async () => {
    const client = new client_s3_1.S3Client({});
    const buckets = [];
    try {
        for await (const page of (0, client_s3_1.paginateListBuckets)({ client }, {})) {
            page.Buckets && buckets.push(...page.Buckets);
        }
        return buckets;
    }
    catch (caught) {
        if (caught instanceof client_s3_1.S3ServiceException) {
            console.error(`${caught.name}: ${caught.message}`);
        }
        else {
            throw caught;
        }
    }
};
exports.getBucketList = getBucketList;
