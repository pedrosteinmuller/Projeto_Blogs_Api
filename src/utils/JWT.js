const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) =>
  jwt.sign({ data: { userId: payload.id } }, TOKEN_SECRET, {
    expiresIn: '10d',
    algorithm: 'HS256',
  });

module.exports = {
  generateToken,
};