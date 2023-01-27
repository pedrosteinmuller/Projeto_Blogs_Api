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

module.exports = {
  createUser,
  getAllUsers,
};