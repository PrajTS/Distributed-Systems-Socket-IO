import { getNews } from "@services/news.service";
import { publishNews } from "@services/publish.service";
import logger from "@shared/Logger";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import helmet from "helmet";
import { createServer } from "http";
import StatusCodes from "http-status-codes";
import morgan from "morgan";
import { Server } from "socket.io";
import BaseRouter from "./routes";

const { BAD_REQUEST } = StatusCodes;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection",  (socket) => {
  socket.onAny(async(channel, news, publisherId) => {
    if (channel === "__join__") {
      const res = await getNews(news);
      io.emit('__welcome__', JSON.stringify(res))
    } else {
      publishNews(JSON.parse(news), channel, publisherId);
      io.emit(channel, JSON.stringify({...JSON.parse(news), publisherId}));
    }
  });
});

app.use(express.json());

// Show routes called in console during development
if (["development", "local"].includes(process.env.NODE_ENV as string)) {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use("/api", BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.err(err, true);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

// Export express instance
export default httpServer;
export { io };
