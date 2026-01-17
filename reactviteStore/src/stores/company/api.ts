import request from "../../api/apiClient";
import apiRoutes from "../../api/api";
import type { PathParamsObject } from "../../api/interface";
import type { Payload } from "./interfaces";

export default {
  getAllCompanies: () => {
    const companyApi = apiRoutes.companies.all;
    return request({
      path: companyApi.path,
      method: companyApi.method,
    });
  },
  getOneCompany: (data: Payload) => {
    console.log(data);
    const companyApi = apiRoutes.companies.one;
    return request({
      path: companyApi.path,
      params: data.params,
      method: companyApi.method,
    });
  },
  getFilteredCompanies: (data: Payload) => {
    const companyApi = apiRoutes.companies.all;
    return request({
      path: companyApi.path,
      params: data.params,
      method: companyApi.method,
      query: data.query,
    });
  },
  addOneCompany: (data: Payload) => {
    const companyApi = apiRoutes.companies.create;

    const formData = new FormData();
    formData.append("name", data.data.name);
    formData.append("ref", data.data.ref);
    formData.append("isoCode", data.data.isoCode);

    return request({
      path: companyApi.path,
      params: data.params,
      method: companyApi.method,
      data: formData,
    });
  },
  updateOneCompany: (data: Payload) => {
    const companyApi = apiRoutes.companies.update;

    const formData = new FormData();
    formData.append("name", data.data.name);
    formData.append("ref", data.data.ref);
    formData.append("isoCode", data.data.isoCode);

    return request({
      path: companyApi.path,
      params: data.params,
      method: companyApi.method,
      data: formData,
    });
  },
  deleteOneCompany: (data: Payload) => {
    const companyApi = apiRoutes.companies.delete;
    return request({
      path: companyApi.path,
      params: data.params,
      method: companyApi.method,
    });
  },
  getCompanyDocuments: (params: PathParamsObject) => {
    const companyApi = apiRoutes.companies.create;
    return request({
      path: companyApi.path,
      params: params,
      method: companyApi.method,
    });
  },
};
