const connection = require('./connection');
const { ObjectId } = require('mongodb');

const newRecipe = async (userId, name, ingredients, preparation) => {
  const results = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }),
  );
  return results.ops[0];
};

const getAll = async () => connection().then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  return connection().then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
};

module.exports = { newRecipe, getAll, getRecipeById };
