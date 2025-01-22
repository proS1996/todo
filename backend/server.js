import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import expressWinston from "express-winston";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import winston from 'winston';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(morgan('dev'));
// Request Logging Middleware
app.use(
	expressWinston.logger({
		transports: [new winston.transports.Console()],
		format: winston.format.json(),
		meta: true,
		msg: "HTTP {{req.method}} {{req.url}}",
		colorize: true
	})
);

// Connect to database
connectDB();

app.use((req, res, next) => {
	console.log('Cookies:', req.cookies); // Debugging line to check cookies
	next();
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Error Logging Middleware
app.use(
	expressWinston.errorLogger({
		transports: [new winston.transports.Console()],
		format: winston.format.json()
	})
);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
