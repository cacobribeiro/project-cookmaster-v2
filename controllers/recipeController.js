const { Router } = require('express');
const rescue = require('express-rescue');
const { newRecipe, getAll, getRecipeById } = require('../models/recipeModels');
const validateJWT = require('../auth/validateJWT');
const { getByEmail } = require('../models/usersModels');
const valid = require('../validations');
const { ObjectId } = require('mongodb');

const recipeRouter = Router();

// Envia um novo produto via POST
recipeRouter.post(
  '/',
  validateJWT,
  rescue(async (req, res) => {
    const result = await valid.recipe({ ...req.body });
    const user = await getByEmail(req.user.email);
    const { name, ingredients, preparation } = req.body;

    switch (true) {
      case result.status === 'invalid':
        return res.status(400).json({ message: 'Invalid entries. Try again.' });

      case result.status === 'ok': {
        const recipe = await newRecipe(user._id, name, ingredients, preparation);
        return res.status(201).json({ recipe });
      }
      default:
        return res.status(404).json({ message: 'Not Found' });
    }
  }),
);

recipeRouter.get(
  '/',
  rescue(async (req, res) => {
    const allRecipes = await getAll();
    res.status(200).json(allRecipes);
  }),
);

recipeRouter.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const recipe = await getRecipeById(id);

    if (recipe) {
      return res.status(200).json(recipe);
    }

    return res.status(404).json({ message: 'recipe not found' });
  }),
);

module.exports = recipeRouter;
