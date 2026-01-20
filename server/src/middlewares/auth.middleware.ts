import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findUserById } from "../services/user.service";
import { ApiError } from "../utils/apierror";
import type { JWTPayload } from "../types";
import { USER_ROLES } from "../constants/roles";


export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.authToken ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload;

    const foundUser = await findUserById(payload._id);

    if (!foundUser || foundUser.email !== payload.email || foundUser.role !== payload.role) {
      return next(new ApiError(401, "Unauthorized"));
    }

    req.user = {
      _id: foundUser._id.toHexString(),
      role: foundUser.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (
  ...allowedRoles: USER_ROLES[]
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized");
      }
      if (!allowedRoles.includes(req.user.role)) {
        throw new ApiError(401, "Unauthorized");
      }
      next();
    } catch (error) {
      next(error)
    }
  }
};