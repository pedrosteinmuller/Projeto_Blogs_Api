const { postService } = require('../services');

const create = async (req, res) => {
  const { id } = req.user.payload;
  const { type, message } = await postService.create(id, req.body);

  if (type !== 200) return res.status(type).json({ message });
  res.status(type).json(message);
};

const getAll = async (_req, res) => {
  const { type, message } = await postService.getAll();
  res.status(type).json(message);
};

const getPostsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.getPostsById(id);
  if (type !== 200) return res.status(type).json({ message });
  res.status(type).json(message);
};

const updatePostById = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user.payload;
  // na linha 27 estou criando no corpo da requisição a chave userId com o valor do id do usuario que está sendo atualizado.
  req.body.userId = userId;
  const { type, message } = await postService.updatePost(id, req.body);
  if (type !== 200) return res.status(type).json({ message });
  return res.status(type).json(message);
};

const deletePostById = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user.payload;

  const { type, message } = await postService.deletePost(id, userId);
  if (type !== 204) return res.status(type).json({ message });
  return res.status(type).json(message);
};

module.exports = {
  create,
  getAll,
  getPostsById,
  updatePostById,
  deletePostById,
};