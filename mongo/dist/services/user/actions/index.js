"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserToken = exports.getUserTokenWithId = exports.getUserToken = exports.storeUserToken = exports.searchForOneUser = exports.createOneUser = exports.countUsers = exports.getUserRole = exports.getUserData = exports.getUserWithSomeEmails = exports.getSomeUsers = exports.getAllUsers = exports.getOneUserWithEmail = exports.getOneUser = void 0;
const mongodb_1 = require("@libs/mongodb");
const mongodb_2 = require("mongodb");
const getOneUser = async (userId) => {
    const userCollection = await (0, mongodb_1.inCollection)("user");
    const user = (await userCollection.findOne({ _id: new mongodb_2.ObjectId(userId) }));
    return user;
};
exports.getOneUser = getOneUser;
const getOneUserWithEmail = async (email) => {
    const userCollection = await (0, mongodb_1.inCollection)("user");
    const user = (await userCollection.findOne({ email: email }));
    return user;
};
exports.getOneUserWithEmail = getOneUserWithEmail;
const getAllUsers = async () => {
    const userCollection = await (0, mongodb_1.inCollection)("user");
    const users = (await userCollection.find({}).sort({ email: 1 }).toArray());
    return users;
};
exports.getAllUsers = getAllUsers;
const getSomeUsers = async (limit) => {
    const userCollection = await (0, mongodb_1.inCollection)("user");
    const users = (await userCollection
        .find({})
        .sort({ email: 1 })
        .limit(limit)
        .toArray());
    return users;
};
exports.getSomeUsers = getSomeUsers;
const getUserWithSomeEmails = async (email) => {
    const userCollection = await (0, mongodb_1.inCollection)("user");
    const users = (await userCollection
        .find({
        $or: [{ email: email }, { email: "default@email.com" }]
    })
        .toArray());
    return users;
};
exports.getUserWithSomeEmails = getUserWithSomeEmails;
const getUserData = async (userId) => {
    const userCollection = await (0, mongodb_1.inCollection)("user");
    const user = await userCollection
        .aggregate([
        {
            $match: {
                _id: new mongodb_2.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "token",
                localField: "_id",
                foreignField: "user_id",
                as: "myToken"
            }
        },
        {
            $unwind: {
                path: "$myToken",
                preserveNullAndEmptyArrays: true
            }
        }
    ])
        .toArray();
    return user;
};
exports.getUserData = getUserData;
const getUserRole = async (userId) => {
    const userCollection = await (0, mongodb_1.inCollection)("roles");
    const user = await userCollection.findOne({ user_id: new mongodb_2.ObjectId(userId) });
    return user;
};
exports.getUserRole = getUserRole;
const countUsers = async () => {
    const userCollection = await (0, mongodb_1.inCollection)("user");
    const count = await userCollection.aggregate([
        { $exist: { email: true } },
        { $count: "summed_users" }
    ]);
    return count;
};
exports.countUsers = countUsers;
const createOneUser = async (data) => {
    const userCollection = await (0, mongodb_1.inCollection)("user");
    const user = await userCollection.insertOne(data);
    return user;
};
exports.createOneUser = createOneUser;
const searchForOneUser = async (email) => {
    const userCollection = await (0, mongodb_1.inCollection)("user");
    const search = `/${email}/`;
    const searchedUser = (await userCollection.find({ email: search }).toArray());
    return searchedUser;
};
exports.searchForOneUser = searchForOneUser;
const storeUserToken = async (token, userId) => {
    const userCollection = await (0, mongodb_1.inCollection)("token");
    const user = await userCollection.insertOne({
        token: token,
        userId: new mongodb_2.ObjectId(userId)
    });
    return user;
};
exports.storeUserToken = storeUserToken;
const getUserToken = async (token) => {
    const userCollection = await (0, mongodb_1.inCollection)("token");
    const userToken = (await userCollection.findOne({
        token: token
    }));
    return userToken;
};
exports.getUserToken = getUserToken;
const getUserTokenWithId = async (userId) => {
    const userCollection = await (0, mongodb_1.inCollection)("token");
    const user = (await userCollection.findOne({
        user_id: new mongodb_2.ObjectId(userId)
    }));
    return user;
};
exports.getUserTokenWithId = getUserTokenWithId;
const deleteUserToken = async (userId) => {
    const userCollection = await (0, mongodb_1.inCollection)("token");
    const user = await userCollection.deleteOne({
        user_id: new mongodb_2.ObjectId(userId)
    });
    return user;
};
exports.deleteUserToken = deleteUserToken;
