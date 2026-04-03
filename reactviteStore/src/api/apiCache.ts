export default {
  cacheRequest: (cache: any, key: any, config: any) => {
    if (cache.has(key) && !cache.has("operation")) {
      // cancel
      return true;
    } else if (config.method !== "get") {
      cache.set("operation", true);
      return false;
    }
  },
  manageResponse: (response: any, cache: any) => {
    if (response.config.method === "get") {
      if (cache.has("operation")) {
        cache.delete("operation");
      }
      cache.set(response.config.url, response.data);

      return response;
    } else {
      cache.set("operation", true);
      return response;
    }
  },
};
