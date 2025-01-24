import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import middlewares from "./middlewares/index.js";
import routes from "./routes/index.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    middlewares(app);

    routes(app);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error.message);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

startServer();
