const { ObjectId } = require('mongodb');
const connection = require('./connection');

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

const update = async (id, name, ingredients, preparation) => {
  connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
  );
  return getRecipeById(id);
};

const removeRecipe = async (id) => {
  await connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  return true;
};

const updateImage = async (id, image) => {
  await connection().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } }),
  );
  return getRecipeById(id);
};

module.exports = { newRecipe, getAll, getRecipeById, update, removeRecipe, updateImage };
