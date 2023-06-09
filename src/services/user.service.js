const { User } = require('../models');
const verifyValidation = require('./validations/verifyFields');
const { generateToken } = require('../utils/JWT');

const createUser = async (body) => {
  const error = verifyValidation.checkUser(body);
    if (error) return { type: 400, message: error };
  const { displayName, email, password, image } = body;
  const user = await User.findOne({ where: { email, password } });
    if (user) return { type: 409, message: 'User already registered' };
    await User.create({ displayName, email, password, image });
    const token = generateToken(body);
    return { type: null, message: token };
};

const getAllUsers = async () => {
  const user = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return { type: 200, message: user };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  if (!user) return { type: 404, message: 'User does not exist' };
  return { type: 200, message: user };
};

const findUserById = async (email) => {
  const { dataValues } = await 
  User.findOne({ where: { email } });

  return dataValues;
};

const removeUserById = async (id) => {
  await User.destroy({ where: { id } });
  return { type: 204, message: '' };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  findUserById,
  removeUserById,
};