import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import expressWinston from "express-winston";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import winston from "winston";

dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(morgan("dev"));

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.json(),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    colorize: true
  })
);

connectDB();

app.use((req, res, next) => {
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.json()
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {});

// Export the app for serverless deployment
export default app;
