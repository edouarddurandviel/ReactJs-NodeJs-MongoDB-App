export default {
    cacheRequest: (cache: any, key: any, config: any) => {
        if (cache.has(key) && !cache.has("update")) {
            // cancel
            return true
        }else if(config.method === "patch"){
            cache.set("update", true);
            return false
        }
    },
    manageResponse: (response: any, cache: any) => {
        if(response.config.method !== "patch" || response.config.method !== "post"){
        if (cache.has("update")) {
            cache.delete("update");
        }
        if (cache.has("post")) {
            cache.delete("update");
        }
        cache.set(response.config.url, response.data);

        return response
        }else{
        cache.set("update", true);
            return response
        }
    }
}