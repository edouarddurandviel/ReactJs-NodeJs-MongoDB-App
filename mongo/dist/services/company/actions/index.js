"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.setAsReviewed = exports.updateOne = exports.findOne = exports.replaceOne = exports.updateMany = exports.insertMany = exports.createOne = exports.getAll = void 0;
const mongodb_1 = require("@libs/mongodb");
const mongodb_2 = require("mongodb");
// READ
const getAll = async () => {
    const companyCollection = await (0, mongodb_1.inCollection)("company");
    const document = (await companyCollection.find({}).toArray());
    return document;
};
exports.getAll = getAll;
// WRITE
const createOne = async (data) => {
    const companyCollection = await (0, mongodb_1.inCollection)("company");
    const document = await companyCollection.insertOne(data);
    return document;
};
exports.createOne = createOne;
const insertMany = async (data) => {
    const companyCollection = await (0, mongodb_1.inCollection)("company");
    const document = await companyCollection.insertMany(data);
    return document;
};
exports.insertMany = insertMany;
const updateMany = async (isoCode, data) => {
    const companyCollection = await (0, mongodb_1.inCollection)("company");
    const document = await companyCollection.updateMany({ isoCode: isoCode }, { set: { "company.ref": data.ref } });
    return document;
};
exports.updateMany = updateMany;
const replaceOne = async (companyId, data) => {
    const companyCollection = await (0, mongodb_1.inCollection)("company");
    const response = await companyCollection.replaceOne({ _id: new mongodb_2.ObjectId(companyId) }, {
        name: data.name,
        ref: data.ref,
        isoCode: data.isoCode
    });
    return response;
};
exports.replaceOne = replaceOne;
const findOne = async (companyId) => {
    const companyCollection = await (0, mongodb_1.inCollection)("company");
    const nid = new mongodb_2.BSON.ObjectId(companyId);
    const document = await companyCollection.findOne({ _id: nid });
    return document;
};
exports.findOne = findOne;
const updateOne = async (companyId, data) => {
    const companyCollection = await (0, mongodb_1.inCollection)("company");
    const document = await companyCollection.updateOne({ _id: new mongodb_2.ObjectId(companyId) }, {
        $set: { "company.name": data.name },
        $currentDate: { lastModified: true }
    });
    return document;
};
exports.updateOne = updateOne;
const setAsReviewed = async (isoCode, data) => {
    const companyCollection = await (0, mongodb_1.inCollection)("company");
    const document = await companyCollection.updateMany({ isoCode: isoCode }, [
        {
            $addFields: {
                reviewed: true,
                completed: true
            },
            $currentDate: {
                lastModified: true
            }
        }
    ]);
    return document;
};
exports.setAsReviewed = setAsReviewed;
const deleteOne = async (companyId) => {
    const companyCollection = await (0, mongodb_1.inCollection)("company");
    const document = await companyCollection.deleteOne({ _id: new mongodb_2.ObjectId(companyId) });
    return document;
};
exports.deleteOne = deleteOne;
