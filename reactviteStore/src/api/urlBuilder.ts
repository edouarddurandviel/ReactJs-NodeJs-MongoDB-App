import type { PathParamsObject } from "./interface";

// Class Method definitions
class builder {
  #getParam(path: string) {
    const el = path.split("/");
    return el.filter((e) => e.startsWith(":")).map((e) => e.substring(1));
  }

  #verifyParams(params: Array<string>, receivedParams: PathParamsObject) {
    const receivedMap = receivedParams;
    const paramsM: PathParamsObject = {};
    params.forEach((e) => Object.assign(paramsM, { [e]: "" }));
    Object.keys(paramsM).forEach((e) => {
      if (Object.keys(receivedMap).includes(e)) {
        paramsM[e] = receivedMap[e];
      }
    });
    return paramsM;
  }

  #createUrl(path: string, buildParams: PathParamsObject) {
    let newPath = "";
    for (const [key, value] of Object.entries(buildParams)) {
      if (key) {
        const regexp = new RegExp(`:${key}`, "i");
        newPath = newPath.length ? newPath.replace(regexp, `${value}`) : path.replace(regexp, `${value}`);
      }
    }
    return newPath;
  }

  UrlBuilder(path: string, params?: PathParamsObject) {
    if (params) {
      const Params = this.#getParam(path);
      const verifiedParamObject = params && this.#verifyParams(Params, params);
      const CUrl = verifiedParamObject ? this.#createUrl(path, verifiedParamObject) : path;
      return CUrl;
    } else {
      return path;
    }
  }
}

export default builder;
