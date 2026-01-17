import AppLegacy from "../views/Home";
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
];

export default ApiRouteSettings;
