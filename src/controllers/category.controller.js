const { categoriesService } = require('../services');

const createCategory = async (req, res) => {
  const { body } = req;
  const { type, message } = await categoriesService.createCategory(body);
  if (type !== 201) {
    return res.status(type).json({ message });
  }

  return res.status(201).json(message);
};

module.exports = {
  createCategory,
};