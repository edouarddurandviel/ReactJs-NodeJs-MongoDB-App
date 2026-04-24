import axios from "axios";
import type { PathParamsObject, QueryObject } from "./interfaces";
import apiCache from "./apiCache";
import { urlBuilder } from "./buildUrl";

// Initialize cache for company
const cache = new apiCache({
  whitelist: ["company"],
});

export default async (props: { path: string; method: string; params?: PathParamsObject; data?: any; query?: QueryObject }) => {
  const apiClient = await axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  apiClient.interceptors.request.use((config) => {
    const key = config.url;
    const isCacheEnabled = cache.manageRequest(key, config);
    if (isCacheEnabled) {
      const data = cache.getCache(key);
      return Promise.reject({
        __fromCache: true,
        data: data,
      });
    } else {
      return config;
    }
  });

  apiClient.interceptors.response.use((response) => {
    const resp = cache.manageResponse(response);
    return resp;
  });

  try {
    const resp = await apiClient.request({
      url: await urlBuilder(props.path, props.params, props.query),
      method: props.method,
      ...(props.data && { data: props.data }),
      validateStatus(status) {
        return status === 200;
      },
    });
    return resp;
  } catch (err: any) {
    if (err.__fromCache) {
      return err;
    }
  }
};
