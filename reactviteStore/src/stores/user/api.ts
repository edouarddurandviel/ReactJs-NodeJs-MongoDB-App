import request from "../../api/apiClient";
import apiRoutes from "../../api/api";
import type { PathParamsObject } from "../../api/interface";
import type { Payload } from "./interfaces";

export default {
  getAllUsers: () => {
    const userApi = apiRoutes.users.all;
    return request({
      path: userApi.path,
      method: userApi.method,
    });
  },
  getOneUser: (data: Payload) => {
    const userApi = apiRoutes.users.one;
    return request({
      path: userApi.path,
      params: data.params,
      method: userApi.method,
    });
  },
  getFilteredUsers: (data: Payload) => {
    const userApi = apiRoutes.users.all;
    return request({
      path: userApi.path,
      params: data.params,
      method: userApi.method,
      query: data.query,
    });
  },
  addOneUser: (data: Payload) => {
    const userApi = apiRoutes.users.create;

    const formData = new FormData();
    formData.append("email", data.data.email);
    formData.append("password", data.data.password);

    return request({
      path: userApi.path,
      method: userApi.method,
      data: formData,
    });
  },

  userLogin: (data: Payload) => {
    const userApi = apiRoutes.users.login;
    return request({
      path: userApi.path,
      query: {
        email: data.query.email,
        password: data.query.password,
      },
      method: userApi.method,
    });
  },

   userLogout: (data: Payload) => {
    const userApi = apiRoutes.users.logout;
    return request({
      path: userApi.path,
      params: data.params,
      method: userApi.method,
    });
  },

  updateOneUser: (data: Payload) => {
    const userApi = apiRoutes.users.update;

    const formData = new FormData();
    formData.append("name", data.data.name);
    formData.append("ref", data.data.email);
    formData.append("isoCode", data.data.password);

    return request({
      path: userApi.path,
      params: data.params,
      method: userApi.method,
      data: formData,
    });
  },
  deleteOneUser: (data: Payload) => {
    const userApi = apiRoutes.users.delete;
    return request({
      path: userApi.path,
      params: data.params,
      method: userApi.method,
    });
  },
  getUserDocuments: (params: PathParamsObject) => {
    const userApi = apiRoutes.users.create;
    return request({
      path: userApi.path,
      params: params,
      method: userApi.method,
    });
  },
};
