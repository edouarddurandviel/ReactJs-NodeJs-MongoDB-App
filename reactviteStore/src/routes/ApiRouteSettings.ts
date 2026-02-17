import AppLegacy from "../views/Home";
import User from "../views/User";
import { lazy } from "react";

const ApiRouteSettings = [
  {
    path: "/",
    name: "home",
    index: true,
    component: AppLegacy,
  },
  {
    path: "/legacy",
    name: "legacy",
    component: AppLegacy,
  },
  {
    path: "/detail/:companyId",
    name: "homeDetail",
    component: lazy(() => import("../views/Detail")),
  },
  {
    path: "/login",
    name: "login",
    component: User,
  },
];

export default ApiRouteSettings;
