const { BlogPost, PostCategory, User, Category } = require('../models');
// const userService = require('./user.service');

const create = async (userId, { title, content, categoryIds }) => {
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

const getPostsById = async (userId) => {
  const post = await BlogPost.findByPk(userId, {
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
  return { type: 200, message: post };
};

const updatePost = async (id, body) => {
  const { title, content, userId } = body;
  // na linha 65 estou pegando o post pelo id a ser atualizado;
  const updatePostById = await getPostsById(id);
  // na verificao abaixo, acesso a chave message e depois o usuario dentro do objeto updatePostById e faço a verificacao de autenticaçõa.
  if (updatePostById.message.userId !== userId) return { type: 401, message: 'Unauthorized user' };
  await BlogPost.update({ title, content }, {
    where: { id },
  });
  const getNewUpdate = await getPostsById(id);
  return { type: 200, message: getNewUpdate.message };
};

module.exports = {
  create,
  getAll,
  getPostsById,
  updatePost,
};