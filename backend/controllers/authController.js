import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import logger from "../utils/logger.js";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    logger.info(`New user registered: ${username}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      logger.warn(`User not found: ${username}`);
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn(`Invalid credentials for user: ${username}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ 
    message: 'Login successful', 
    token 
  });
    logger.info(`User logged in: ${username}`);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    logger.error(`Error logging in user ${username}: ${error.message}`);
    res.status(500).json({ message: 'Error logging in', error });
  }
};


export const logoutUser = (req, res) => {
  logger.info(`User logged out: ${req.userId}`);
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};

