const { Router } = require('express');
const multer = require('multer');
const rescue = require('express-rescue');

const {
  newRecipe,
  getAll,
  getRecipeById,
  update,
  removeRecipe,
} = require('../models/recipeModels');
const imageUpload = require('../services/imageUpload');
const validateJWT = require('../auth/validateJWT');
const { getByEmail } = require('../models/usersModels');
const valid = require('../validations');
const recipe = require('../models');

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
        const recipe = await newRecipe(user.id, name, ingredients, preparation);
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

recipeRouter.put(
  '/:id',
  validateJWT,
  rescue(async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;

    const recipe = await update(id, name, ingredients, preparation);

    if (recipe) {
      return res.status(200).json(recipe);
    }

    return res.status(404).json({ message: 'recipe not found' });
  }),
);

recipeRouter.delete(
  '/:id',
  validateJWT,
  rescue(async (req, res) => {
    try {
      const { id } = req.params;
      const removed = await removeRecipe(id);
      if (removed) {
        return res.status(204).json({ message: 'ok' });
      }
    } catch (err) {
      return res.status(404).json({ message: 'recipe not found' });
    }
  }),
);

recipeRouter.put(
  '/:id/image',
  validateJWT,
  imageUpload,
  rescue(async (req, res) => {
    try {
      const { id } = req.params;
      const { filename } = req.file;
      console.log(filename);
      const path = `localhost:3000/images/${filename}`;
      const result = await recipe.updateImage(id, path);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ message: 'recipe not found' });
    }
  }),
);

module.exports = recipeRouter;
