import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logger.warn(`Unauthorized access attempt from IP: ${req.ip}`);
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    logger.warn(`No token provided in Bearer header from IP: ${req.ip}`);
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    logger.info(`User ${req.userId} authenticated successfully`);
    next();
  } catch (error) {
    logger.error(
      `Failed to authenticate user from IP: ${req.ip}, Error: ${error.message}`
    );
    res.status(403).json({ message: "Forbidden" });
  }
};

export default authenticate;
