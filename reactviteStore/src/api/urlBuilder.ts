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

  #serialize(query: any){
    let serialized: string = '?'
    for (let key in query) {
      if (query.hasOwnProperty(key)) {
          if (serialized !== "") {
              serialized += "&";
          }
          serialized += key + "=" + query[key];
      }
    }
    return serialized
  }

  UrlBuilder(path: string, params?: PathParamsObject, query?: any) {
    const Params = this.#getParam(path);
    let serialized: string | null = null

    if (params) {
      const verifiedParamObject = this.#verifyParams(Params, params);
    
      if(query){
        serialized = this.#serialize(query)
      }

      const url = verifiedParamObject ? 
        this.#createUrl(path, verifiedParamObject) : 
        `${serialized && path+serialized || path}`;

      return url;
    } else {
      if(query){
        serialized = this.#serialize(query)
      }
      return `${serialized && path+serialized || path}`;
    }
  }
}

export default builder;
