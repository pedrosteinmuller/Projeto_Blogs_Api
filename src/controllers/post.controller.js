const { postService } = require('../services');

const create = async (req, res) => {
  const { email } = req.user;
  // console.log(email);
  const { type, message } = await postService.create(email, req.body);

  if (type) return res.status(type).json({ message });
  res.status(type).json(message);
};

const getAll = async (_req, res) => {
  const { type, message } = await postService.getAll();
  res.status(type).json(message);
};

module.exports = {
  create,
  getAll,
};