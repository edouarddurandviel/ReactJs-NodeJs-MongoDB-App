export default class apiCache {
  cacheConfig;
  cache;

  constructor(cacheConfig: { whitelist: string[] }) {
    this.cacheConfig = cacheConfig;
    this.cache = new Map();
  }

  public getCache = (key: any) => {
    return this.cache.get(key);
  };

  public cacheRequest = (key: any, config: any) => {
    const item = key.split("/")[0];
    const whiteListed = this.cacheConfig.whitelist.filter((e: string) => e === item);

    if (whiteListed === undefined) {
      return false;
    } else {
      if (this.cache.has(key) && !this.cache.has("operation")) {
        // cancel
        return true;
      } else if (
        config.method === "patch" || 
        config.method === "post" || 
        config.method === "delete"
      ) {
        this.cache.set("operation", true);
        return false;
      }
    }
  };

  public manageResponse = (response: any) => {
    if (response && response.config.method === "get") {
      if (this.cache.has("operation")) {
        this.cache.delete("operation");
      }
      this.cache.set(response.config.url, response.data);

      return response;
    } else {
      this.cache.set("operation", true);

      return response;
    }
  };
}
