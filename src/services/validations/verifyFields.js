const schema = require('./schema');

const checkUser = (infos) => {
  const { error } = schema.createUserSchema.validate(infos);
  if (error) return error.message;
  return null;
};

module.exports = {
  checkUser,
};