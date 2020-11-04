const { Router } = require('express');
const rescue = require('express-rescue');

const recipe = require('../models');

const imageRouter = Router();

imageRouter.get(
  '/:id',
  //   validateJWT,
  rescue(async (req, res) => {
    try {
      const { id } = req.params;
      const result = await recipe.getRecipeById(id.slice(0, 24));
      console.log(result.image);
      return res.status(200).sendFile(result.image);
    } catch (error) {
      return res.status(404).json({ message: 'recipe not found' });
    }
  }),
);

module.exports = imageRouter;
