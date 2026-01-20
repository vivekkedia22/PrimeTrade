import type { RedisClientType } from "@redis/client";
import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
}) as RedisClientType;

redisClient.on("error", (err:Error) => console.error("Redis client error:", err));

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    process.exit(1);
  }
};