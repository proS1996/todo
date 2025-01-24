import express from "express"; // Import express to use app-level middlewares
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import expressWinston from "express-winston";
import winston from "winston";


const middlewares = (app) => {
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(morgan("dev"));

  // Custom logging configuration
  const loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
      })
    ),
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
    meta: false,
  };

  app.use(expressWinston.logger(loggerOptions));
  app.use(expressWinston.errorLogger(loggerOptions));
};

export default middlewares;
