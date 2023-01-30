const { BlogPost, PostCategory, User, Category } = require('../models');
// const userService = require('./user.service');

const create = async (userId, { title, content, categoryIds }) => {
  // const { id: userId } = await User.findOne({ where: { id } });
  // console.log(userId);
  const post = await BlogPost.create({ title, content, userId });
  const categoriesId = categoryIds.map((item) => ({ 
    postId: post.id, 
    categoryId: item,
  }));
    if (categoryIds.length === 0) {
    return { type: 400, message: 'one or more "categoryIds" not found' };
  }
  const verifyCategories = categoryIds.map((e) => Category.findByPk(e));
  // o resultado do console.log da constante verifyCategories estava retornando um array de Promises, com isso, foi necessário resolvê-las na linha 17.
  const resolve = await Promise.all(verifyCategories);
  // no if abaixo estou verificando no array de categories se algum elemento é inválido, se for retorna um erro 400 com mensagem, caso contario, cria o array de categorias.
  if (resolve.some((i) => i === null)) {
    return { type: 400, message: 'one or more "categoryIds" not found',
  };
}
    await PostCategory.bulkCreate(categoriesId);
  return { type: 201, message: post };
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
  return { type: 200, message: allPosts };
};

const getPostsById = async (id) => {
  const post = await BlogPost.findByPk(id, {
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
  if (!post) return { type: 404, message: 'Post does not exist' };
  return { type: 200, messsage: post };
};

module.exports = {
  create,
  getAll,
  getPostsById,
};