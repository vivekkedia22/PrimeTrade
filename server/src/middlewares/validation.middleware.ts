import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apierror";

export function validationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const firstError = result.array()[0];
    return next(new ApiError(400, firstError?.msg || "Validation error"));
  }
  next();
}
