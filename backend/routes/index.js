import authRoutes from "./authRoutes.js";
import todoRoutes from "./todoRoutes.js";

const routes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/todos", todoRoutes);
};

export default routes;
