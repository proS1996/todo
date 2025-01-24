import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const token = req.cookies.token; // Get the token from cookies
  console.log("🚀 ~ authenticate ~ token:", token)

  if (!token) {
    return res.status(401).json({ message: 'No token, no access' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticate;
