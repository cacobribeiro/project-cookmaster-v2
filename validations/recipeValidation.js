const loginValidation = async ({ name, ingredients, preparation }) => {
  switch (true) {
    case !name || !ingredients || !preparation:
      return { status: 'invalid' };
    default:
      return { status: 'ok' };
  }
};

module.exports = loginValidation;
