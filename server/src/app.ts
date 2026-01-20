import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import userRoutes from "./routes/user.routes";
import todoRoutes from "./routes/todo.routes";
import { setupSwagger } from './swagger';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import type { Response } from "express"

const app = express();

dotenv.config({ path: ".env" });

if (
  !process.env.JWT_SECRET ||
  !process.env.MONGO_URI ||
  !process.env.JWT_EXPIRES_IN
) {
  throw new Error("Missing environment variables");
}
app.use(cors({
  origin: [process.env.CLIENT_URL || "http://localhost:5173", "http://localhost:5173"],
  credentials: true,
}));
app.set("trust proxy", 1);

app.use(cookieParser());
app.use(express.json());
app.use(logger);

app.get("/", (_, res: Response) => res.status(200).send("Hello World!"))

app.use("/api/v1", userRoutes);
app.use("/api/v1", todoRoutes);
app.use(errorHandler);

setupSwagger(app);
export default app;
