const { User } = require('../models');

const authenticateLogin = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
  });
  if (!user) return { type: 400, message: 'Invalid fields' };
  
  return { type: '', message: user };
};

module.exports = {
  authenticateLogin,
};