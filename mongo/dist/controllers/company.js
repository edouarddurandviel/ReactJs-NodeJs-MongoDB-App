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
const company_1 = __importDefault(require("@services/company"));
const companySchemas = __importStar(require("../_joiSchemas/company"));
const generalSchemas = __importStar(require("../_joiSchemas/general"));
const server_1 = require("@libs/server");
const sessionToken_1 = require("@middleware/sessionToken");
const remoteAccess_1 = require("@middleware/remoteAccess");
exports.default = (io) => {
    const router = express_1.default.Router();
    const companyServices = new company_1.default(io);
    // Write
    router.post("/create", async (req, res) => {
        try {
            const data = await companySchemas.fullCompany.validateAsync(req.body);
            const result = await companyServices.createOneCompany(data);
            res.status(200).json({ err: false, data: result });
        }
        catch (error) {
            (0, server_1.handleErrors)(error);
        }
    });
    router.patch("/replace/:companyId", async (req, res) => {
        try {
            const data = await companySchemas.fullCompany.validateAsync(req.body);
            const companyId = await generalSchemas.textSchema.validateAsync(req.params.companyId);
            await companyServices.replaceOneCompany(companyId, data);
            res.status(200).json({ err: false });
        }
        catch (error) {
            (0, server_1.handleErrors)(error);
        }
    });
    router.patch("/update/many", sessionToken_1.sessionToken, async (req, res) => {
        try {
            const data = await companySchemas.fullCompany.validateAsync(req.body);
            const companyId = await generalSchemas.textSchema.validateAsync(req.params.companyId);
            const result = await companyServices.updateManyCompanies(companyId, data);
            res.status(200).json({ err: false, data: result });
        }
        catch (error) {
            (0, server_1.handleErrors)(error);
        }
    });
    router.patch("/update/:companyId", sessionToken_1.sessionToken, async (req, res) => {
        try {
            const data = await companySchemas.company.validateAsync(req.body);
            const companyId = await generalSchemas.textSchema.validateAsync(req.params.companyId);
            const result = await companyServices.updateOneCompany(companyId, data);
            res.status(200).json({ err: false, data: result });
        }
        catch (error) {
            (0, server_1.handleErrors)(error);
        }
    });
    router.delete("/delete/:companyId", async (req, res) => {
        try {
            const companyId = await generalSchemas.textSchema.validateAsync(req.params.companyId);
            const result = await companyServices.deleteOneCompany(companyId);
            res.status(200).json({ err: false, data: result });
        }
        catch (error) {
            (0, server_1.handleErrors)(error);
        }
    });
    router.get("/all", async (req, res) => {
        try {
            const result = await companyServices.getCompanies();
            res.status(200).json({ err: false, data: result });
        }
        catch (error) {
            (0, server_1.handleErrors)(error);
        }
    });
    router.get("/one/:companyId", async (req, res) => {
        try {
            const companyId = await generalSchemas.textSchema.validateAsync(req.params.companyId);
            const result = await companyServices.getOneCompany(companyId);
            res.status(200).json({ err: false, data: result });
        }
        catch (error) {
            (0, server_1.handleErrors)(error);
        }
    });
    router.post("/remote/post", remoteAccess_1.remotePostAccess, async (req, res) => {
        try {
            const result = await companyServices.getCompanyLogs();
            res.status(200).json({ err: false, data: result });
        }
        catch (error) {
            (0, server_1.handleErrors)(error);
        }
    });
    return router;
};
