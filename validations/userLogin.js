const usersModels = require('../models/usersModels');

const loginValidation = async ({ email, password }) => {
  const exists = await usersModels.getByEmail(email);

  switch (true) {
    case !email || !password:
      return { status: 'all_fields' };
    case !exists:
      return { status: 'wrong_key' };
    case exists.password !== password || exists.email !== email:
      return { status: 'wrong_key' };
    default:
      return { status: 'ok' };
  }
};

module.exports = loginValidation;
