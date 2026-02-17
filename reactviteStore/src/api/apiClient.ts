import axios from "axios";
import urlBuilder from "./urlBuilder";
import type { PathParamsObject } from "./interface";

export default (props: { 
  path: string; 
  method: string; 
  params?: PathParamsObject; 
  data?: any; 
  query?: object 
}) => {
  const helper = new urlBuilder();

  const apiClient = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return apiClient.request({
    url: helper.UrlBuilder(
      props.path, 
      props.params, 
      props.query
    ),
    method: props.method,
    ...(props.data && { data: props.data })
  });
};
