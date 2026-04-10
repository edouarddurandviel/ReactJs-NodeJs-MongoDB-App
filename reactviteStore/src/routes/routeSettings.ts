import AppLegacy from "../views/Home";
import Auth from "../views/Auth";
import CreateUser from "../views/User/create";
import UserProfil from "../views/User/profil";
import { lazy } from "react";
import DesignPatterns from "../views/DesignPatterns";

const RouteSettings = [
  {
    path: "/",
    name: "home",
    index: true,
    component: AppLegacy,
  },
  {
    path: "/user/add",
    name: "createUser",
    component: CreateUser,
  },
  {
    path: "/detail/:companyId",
    name: "homeDetail",
    component: lazy(() => import("../views/Detail")),
  },
  {
    path: "/login",
    name: "login",
    component: Auth,
  },
  {
    path: "/user/profil",
    name: "profil",
    component: UserProfil,
  },
  {
    path: "/design-patterns",
    name: "patterns",
    component: DesignPatterns,
  },
];

export default RouteSettings;
