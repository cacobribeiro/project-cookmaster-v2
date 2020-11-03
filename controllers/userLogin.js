const { Router } = require('express');
const rescue = require('express-rescue');
const createToken = require('../auth/token');
const loginValidation = require('../validations/userLogin');

const userLogin = Router();

userLogin.post(
  '/',
  rescue(async (req, res) => {
    const results = await loginValidation({ ...req.body });

    switch (true) {
      case results.status === 'all_fields':
        return res.status(401).json({ message: 'All fields must be filled' });
      case results.status === 'wrong_key':
        return res.status(401).json({ message: 'Incorrect username or password' });
      default: {
        const token = createToken(req.body);
        return res.status(200).json({ token });
      }
    }
  }),
);

module.exports = userLogin;
