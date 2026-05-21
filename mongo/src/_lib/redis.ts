import { createClient } from "redis";

export const redisClient = async () => {
  const client = await createClient({ url: "redis://redisMsg:6379" })
    .on("error", err => console.log("Redis Client Error", err))
    .connect();

  return client;
};
