const mongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const DB_URL = process.env.MONGO_DB_URL_LOCAL || 'mongodb://mongodb:27017/Cookmaster';
const DATABASE = process.env.DB_NAME || 'Cookmaster';

const connection = () =>
  mongoClient
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DATABASE))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
