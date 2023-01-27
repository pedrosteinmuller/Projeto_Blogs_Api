const { BlogPost, PostCategory } = require('../models');

const create = async (userId, { title, content, categoryIds }) => {
  const post = await BlogPost.create({ title, content, userId });
  const categoriesId = categoryIds.map((item) => ({ postId: post.id, categoryId: item }));
  try {
    await PostCategory.bulkCreate(categoriesId);
  } catch (error) {
    return { type: 400, message: 'one or more "categoryIds" not found' };
}
  return { type: 201, message: post };
};
module.exports = {
  create,
};