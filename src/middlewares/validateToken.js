require('dotenv').config();
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET;

const analyzeToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    res.locals.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = analyzeToken;