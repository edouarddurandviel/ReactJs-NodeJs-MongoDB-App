import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { socketMiddleware } from "./socket/routes";
import { companyMiddleware } from "./company/routes";

const groupedMiddlewares = [companyMiddleware, socketMiddleware];

export const rootMiddleware = applyMiddleware(thunk, ...groupedMiddlewares);
