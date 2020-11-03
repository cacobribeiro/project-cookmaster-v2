const connection = require('./connection');

const newUser = async (name, email, password) => {
  const results = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }),
  );
  return results.ops[0];
};

const getByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

module.exports = { newUser, getByEmail };
