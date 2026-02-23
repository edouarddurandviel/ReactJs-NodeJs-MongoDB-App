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

   addProfil: (data: Payload) => {
    const userApi = apiRoutes.users.addProfil;

    const formData = new FormData();
    if(data.data.profil){

      console.log(data)
      formData.append("firstName", data.data.profil.firstName);
      formData.append("lastName", data.data.profil.lastName);
      formData.append("address", data.data.profil.address);
      formData.append("postCode", data.data.profil.postCode);
      formData.append("city", data.data.profil.city);
      formData.append("phone", data.data.profil.phone);
    }

    return request({
      path: userApi.path,
      params: data.params,
      method: userApi.method,
      data: formData,
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
