import express from "express";
import UsersController from "./user";
import CompanyController from "./company";
import RemoteController from "./remote";
import { Server } from "socket.io";
import { sessionToken } from "@middleware/sessionToken";

export default (io: Server) => {
  const app = express.Router({
    mergeParams: false,
    caseSensitive: true,
    strict: true
  });

  app.use("/company", sessionToken, CompanyController(io));
  app.use("/user", UsersController(io));
  app.use("/remote", RemoteController(io));

  return app;
};
