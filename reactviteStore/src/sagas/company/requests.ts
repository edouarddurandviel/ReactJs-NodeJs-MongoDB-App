import apiClient from "../../api/apiClient";
import apiRoutes from "../../api/api";
import builder from "../../api/urlBuilder";
import type { PathParamsObject } from "../../api/interface";

const inst = apiClient();
const url = new builder();

export default {
  getAllCompanies: () => {
    const api = apiRoutes.companies.all;
    return inst.request({
      url: api.path,
      method: api.method,
    });
  },
  addOneCompany: (params: PathParamsObject, data: object) => {
    const api = apiRoutes.companies.create;
    return inst.request({
      url: url.UrlBuilder(api.path, params),
      method: api.method,
      data: data,
    });
  },
  getCompanyDocuments: (params: PathParamsObject) => {
    const api = apiRoutes.companies.create;
    return inst.request({
      url: url.UrlBuilder(api.path, params),
      method: api.method,
    });
  },
};
