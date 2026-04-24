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

  // operation: (undefined/trrue) should or should not refresh data
  public cacheRequest = (key: any, config: any) => {
    const item = key.split("/")[0];
    const whiteListed = this.cacheConfig.whitelist.filter((e: string) => e === item);

    // if route has been registeted in the previous whiteListe
    // do not proceed to any request
    if (whiteListed === undefined) {
      return false;
    } else {
      // check if there is any current proceeding operations
      if (this.cache.has(key) && !this.cache.has("operation")) {
        // cancel cache request
        return true;
      } else if (
        config.method === "patch" || 
        config.method === "post" || 
        config.method === "delete"
      ) {
        // for any writing requests  
        this.cache.set("operation", true);
        return false;
      }
    }
  };

  public manageResponse = (response: any) => {
    // For any read requests consume operation
    if (response && response.config.method === "get") {
      if (this.cache.has("operation")) {
        this.cache.delete("operation");
      }
      this.cache.set(response.config.url, response.data);

      return response;
    } else {
      // for any writing running operations add operation to cache
      this.cache.set("operation", true);

      return response;
    }
  };
}
