import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../utils/logger.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 60 * 60 * 1000
};

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    await user.save();
    logger.info(`New user registered: ${username}`);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.cookie("token", token, cookieOptions);

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    logger.info("User logged out");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    logger.error(`Error logging out user: ${error.message}`);
    res.status(500).json({ message: "Error logging out", error });
  }
};

export const getMe = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, no access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to authenticate", error });
  }
};
