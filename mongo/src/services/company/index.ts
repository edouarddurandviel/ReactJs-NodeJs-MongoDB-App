import { Server } from "socket.io";
import fs from "fs";
import { CreateCompany } from "../../_interfaces/company";
import * as companyActions from "./actions";
import * as companySockets from "./sockets/clients";
import CompanyAdminSocket from "./sockets/admin";
import { getObject } from "../aws/s3/getObject";
//import { redisClient } from "@libs/redis";
import path from "path";
import { open } from "fs/promises";
//import { RedisArgument } from "redis";

class CompanyController {
  private _io;
  private admin;

  constructor(io: Server) {
    this._io = io;
    this.admin = new CompanyAdminSocket();
  }

  public async getDocuments() {
    const documents = await getObject("test", "document.jpg");
    return documents;
  }

  public async getOneCompany(companyId: string) {
    const result = await companyActions.findOne(companyId);

    return result;
  }

  public async getCompanies() {
    const companies = await companyActions.getAll();
    return companies;
  }

  public async createOneCompany(company: CreateCompany) {
    await companyActions.createOne(company);
    companySockets.reloadCompanies();
  }

  public async updateOneCompany(companyId: string, data: CreateCompany) {
    await companyActions.updateOne(companyId, data);

    companySockets.reloadCompanies();
  }

  public async updateManyCompanies(companyId: string, data: CreateCompany) {
    await companyActions.updateMany(companyId, data);

    companySockets.reloadCompany(1, {
      params: {
        userId: 1
      }
    });
  }

  public async replaceOneCompany(companyId: string, data: CreateCompany) {
    await companyActions.replaceOne(companyId, data);

    companySockets.reloadCompanies();
  }

  public async deleteOneCompany(companyId: string) {
    await companyActions.deleteOne(companyId);

    companySockets.reloadCompanies();
  }

  public async getCompanyLogs() {
    const docPath = path.resolve("isolate-000001A595F92050-14492-v8.log");
    const doc = await open(docPath);
    for await (const line of doc.readLines()) {
      console.log(line);
    }

    return doc;
  }
}

export default CompanyController;
