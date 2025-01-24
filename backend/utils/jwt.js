import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign({ id }, import.meta.VITE_JWT_SECRET, { expiresIn: '1h' });
};
