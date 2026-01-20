import type { Request, Response, NextFunction } from "express";
import { redisClient } from "../utils/redisClient";
import { ApiError } from "../utils/apierror";

export const cache = (
  keyBuilder: (req: Request) => string,
  ttl = 10
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = keyBuilder(req);
      const cachedData = await redisClient.get(key);

      if (cachedData) {
        console.log("sending cached result");
        return res.status(200).json(JSON.parse(cachedData));
      }

      
      const originalJson = res.json;
      res.json = function (data?: any) {
        redisClient
          .setEx(key, ttl, JSON.stringify(data))
          .catch((err: Error) =>
            console.error("Failed to set cache in Redis:", err)
          );
        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error("Redis cache middleware error:", error);
      next(new ApiError(500, "Cache error"));
    }
  };
};