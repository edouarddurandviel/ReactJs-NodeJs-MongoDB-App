import axios from "axios";
import urlBuilder from "./urlBuilder";
import type { PathParamsObject, QueryObject } from "./interfaces";
import { cachedRequest, cachedResponse } from "./cacheManagment";

const cache = new Map()

export default async (props: { path: string; method: string; params?: PathParamsObject; data?: any; query?: QueryObject }) => {
  const helper = new urlBuilder();


  const apiClient = await axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    }
  });
  

  apiClient.interceptors.request.use((config) => {
    const key = config.url
    const auth = cachedRequest(cache, key, config)

    return auth ? Promise.reject({
      __fromCache: true,
      data: cache.get(key),
    }) : config;
   
  });

  apiClient.interceptors.response.use((response) => {
    const resp = cachedResponse(response, cache)
    return resp;
  });

  try{

    const resp = await apiClient.request({
      url: helper.UrlBuilder(props.path, props.params, props.query),
      method: props.method,
      ...(props.data && { data: props.data }),
      validateStatus(status) {
        return status === 200
      }
    });
    return resp

  }catch(err: any){

    if (err.__fromCache) {
      return err.data;
    }

  }
};
