import type { PathParamsObject, QueryObject } from "./interfaces";

const getParam = (path: string) => {
  const el = path.split("/");
  return el.filter((e) => e.startsWith(":")).map((e) => e.substring(1));
};

const verifyParams = (params: Array<string>, receivedParams: PathParamsObject) => {
  const receivedMap = receivedParams;
  const paramsM: PathParamsObject = {};
  params.forEach((e) => Object.assign(paramsM, { [e]: "" }));
  Object.keys(paramsM).forEach((e) => {
    if (Object.keys(receivedMap).includes(e)) {
      paramsM[e] = receivedMap[e]!;
    }
  });
  return paramsM;
};

const createUrl = (path: string, buildParams: PathParamsObject) => {
  let newPath = "";
  for (const [key, value] of Object.entries(buildParams)) {
    if (key) {
      const regexp = new RegExp(`:${key}`, "i");
      newPath = newPath.length ? newPath.replace(regexp, `${value}`) : path.replace(regexp, `${value}`);
    }
  }
  return newPath;
};

const serialize = (query: QueryObject) => {
  let serialized: string = "?";
  for (let key in query) {
    if (query.hasOwnProperty(key)) {
      if (serialized !== "?") {
        serialized += "&";
      }
      serialized += key + "=" + query[key];
    }
  }
  return serialized;
};

export const urlBuilder = (path: string, params?: PathParamsObject, query?: QueryObject) => {
  const Params = getParam(path);
  let serialized: string | null = null;

  if (params) {
    const verifiedParamObject = verifyParams(Params, params);

    if (query) {
      serialized = serialize(query);
    }

    const url = verifiedParamObject ? createUrl(path, verifiedParamObject) : `${(serialized && path + serialized) || path}`;

    return url;
  } else {
    if (query) {
      serialized = serialize(query);
    }
    return `${(serialized && path + serialized) || path}`;
  }
};
