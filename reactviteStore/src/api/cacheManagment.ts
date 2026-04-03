export const cachedRequest = (cache: any, key: any, config: any) => {
     if (cache.has(key) && !cache.has("update")) {
        // cancel
        return true
    }else if(config.method === "patch"){
        cache.set("update", true);
        return false
    }
}

export const manageResponse = (response: any, cache: any) => {
     if(response.config.method !== "patch"){
      if (cache.has("update")) {
          cache.delete("update");
      }
      cache.set(response.config.url, response.data);

      return response
    }else{
      cache.set("update", true);
        return response
    }
}