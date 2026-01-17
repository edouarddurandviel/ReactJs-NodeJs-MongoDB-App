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
const express_1 = __importDefault(require("express"));
const userSchemas = __importStar(require("../_joiSchemas/users"));
const server_1 = require("@libs/server");
const sessionToken_1 = require("@middleware/sessionToken");
const user_1 = __importDefault(require("@services/user"));
const storage_1 = require("@google-cloud/storage");
const google_1 = __importDefault(require("../_config/google"));
exports.default = (io) => {
    const router = express_1.default.Router({
        mergeParams: false,
        caseSensitive: true,
        strict: true
    });
    const userServices = new user_1.default(io);
    /* users pages. */
    router.post("/create", async (req, res) => {
        try {
            const data = await userSchemas.user.validateAsync(req.body);
            const result = await userServices.createOneUser(data);
            res.status(200).json({ err: false, data: result });
        }
        catch (error) {
            (0, server_1.handleErrors)(error);
        }
    });
    router.post("/login", async (req, res) => {
        try {
            const data = await userSchemas.userAuth.validateAsync(req.body);
            const result = await userServices.login(data);
            res.cookie("jwt", result, {
                expires: new Date(Date.now() + 1 * 3600000),
                secure: true,
                httpOnly: true,
                domain: "example.com",
                path: "/"
            });
        }
        catch (error) {
            (0, server_1.handleErrors)(error);
        }
    });
    router.post("/logout/:userId", async (req, res) => {
        try {
            const data = await userSchemas.uidSchema.validateAsync(req.params.userId);
            const result = await userServices.logout(data);
            res.clearCookie("jwt");
            res.status(200).json({ err: false, data: result });
        }
        catch (error) {
            (0, server_1.handleErrors)(error);
        }
    });
    router.get("/all", sessionToken_1.sessionToken, async (req, res) => {
        try {
            const result = await userServices.getAllUsers();
            res.status(200).json({ err: false, data: result });
        }
        catch (error) {
            (0, server_1.handleErrors)(error);
        }
    });
    router.get("/:userId", sessionToken_1.sessionToken, async (req, res) => {
        try {
            const userId = await userSchemas.userId.validateAsync(req.params.userId);
            const result = await userServices.getUserData(userId);
            res.status(200).json({ err: false, data: result });
        }
        catch (error) {
            (0, server_1.handleErrors)(error);
        }
    });
    router.get("/gcloud/picture", async (req, res) => {
        try {
            const options = {
                projectId: "progresswebapp-cf1d7",
                keyFilename: google_1.default.buckets.google || "default"
            };
            const storage = new storage_1.Storage(options);
            const [buckets] = await storage.getBuckets();
            res.status(200).json({ err: false, data: buckets });
        }
        catch (error) {
            (0, server_1.handleErrors)(error);
        }
    });
    return router;
};
