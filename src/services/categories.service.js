const { Category } = require('../models');

const createCategory = async ({ name }) => {
  if (!name) return { type: 400, message: '"name" is required' };
  const category = await Category.create({ name });
  return { type: 201, message: category };
};

const getAllCategories = async () => {
  const getAll = await Category.findAll();
  return { type: 200, message: getAll };
};

module.exports = {
  createCategory,
  getAllCategories,
};