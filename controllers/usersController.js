const { Router } = require('express');
const rescue = require('express-rescue');
// const jwt = require('jsonwebtoken');
// const { ObjectId } = require('mongodb');
const usersModels = require('../models/usersModels');
const newUserValidation = require('../validations/usersValidations');

const userRouter = Router();

// Envia um novo produto via POST
userRouter.post(
  '/',
  rescue(async (req, res) => {
    const result = await newUserValidation({ ...req.body });
    const { name, email, password } = req.body;
    switch (true) {
      case result.status === 'invalid':
        return res.status(400).json({ message: 'Invalid entries. Try again.' });
      case result.status === 'exists':
        return res.status(409).json({ message: 'Email already registered' });
      case result.status === 'ok': {
        const user = await usersModels.newUser(name, email, password);
        const { password: _, ...userWithoutPass } = user;
        return res.status(201).json({ user: userWithoutPass });
      }
      default:
        return res.status(404).json({ message: 'Not Found' });
    }
  }),
);

module.exports = userRouter;
