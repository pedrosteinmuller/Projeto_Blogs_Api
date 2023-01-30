const { postService } = require('../services');

const create = async (req, res) => {
  const { id } = req.user.payload;
  const { type, message } = await postService.create(id, req.body);

  if (type !== 201) return res.status(type).json({ message });
  res.status(type).json(message);
};

const getAll = async (_req, res) => {
  const { type, message } = await postService.getAll();
  res.status(type).json(message);
};

const getPostsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.getPostsById(id);
  if (type) return res.status(type).json({ message });
  res.status(type).json(message);
};

module.exports = {
  create,
  getAll,
  getPostsById,
};