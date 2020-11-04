const express = require('express');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const controller = require('./controllers');

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(`${__dirname}/images`)));

app.use('/images', controller.image);

app.use('/users', controller.users);

app.use('/login', controller.login);

app.use('/recipes', controller.recipe);

app.listen(PORT, () => console.log(`Listening Port ${PORT}`));
