import { createServer } from "http";
import app from "./app";
import { connectDB } from "./db";
import { connectRedis } from "./utils/redisClient";

const PORT = process.env.PORT || 8000;

const server = createServer(app);

const startServer = async () => {
  try {
    await connectRedis();
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
