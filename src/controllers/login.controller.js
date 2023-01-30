const { loginService } = require('../services');
const { generateToken } = require('../utils/JWT');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await loginService.authenticateLogin(email, password);
  if (type) return res.status(400).json({ message });
const { displayName, email: Email, image, id } = message;
  const token = generateToken({ displayName, email: Email, image, id });

  res.status(200).json({ token });
};

module.exports = {
  loginUser,
};