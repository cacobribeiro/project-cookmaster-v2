const usersModels = require('../models/usersModels');

const EMAIL_REGEX = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

const newUserValidation = async ({ name, email, password }) => {
  const exists = await usersModels.getByEmail(email);
  switch (true) {
    case !name || !email || !password:
      return { status: 'invalid' };
    case !EMAIL_REGEX.test(email):
      return { status: 'invalid' };
    case exists !== null:
      return { status: 'exists' };
    default:
      return { status: 'ok' };
  }
};

module.exports = newUserValidation;
