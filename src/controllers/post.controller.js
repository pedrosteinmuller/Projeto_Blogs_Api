const { postService } = require('../services');

const create = async (req, res) => {
  const { type, message } = await postService.create(req.user.id, req.body);

  if (type) return res.status(type).json({ message });

  return res.status(type).json(message);
};

module.exports = {
  create,
};