const { BlogPost, PostCategory, User, Category } = require('../models');

const create = async (id, { title, content, categoryIds }) => {
  const post = await BlogPost.create({ title, content, userId: id });
  const categoriesId = categoryIds.map((item) => ({ postId: post.id, categoryId: item }));
    if (categoryIds.length === 0) {
    return { type: 400, message: 'one or more "categoryIds" not found' };
  }
    await PostCategory.bulkCreate(categoriesId);
  return { type: null, message: post };
};

const getAll = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  console.log(allPosts);
  return { type: 200, message: allPosts };
};

module.exports = {
  create,
  getAll,
};