const { userService } = require('../services');

const createUser = async (req, res) => {
  const { body } = req;
  const { type, message } = await userService.createUser(body);
  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(201).json({ token: message });
};

const getAllUsers = async (_req, res) => {
  const { type, message } = await userService.getAllUsers();
  res.status(type).json(message);
};

module.exports = {
  createUser,
  getAllUsers,
};