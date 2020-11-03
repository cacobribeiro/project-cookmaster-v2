const jwt = require('jsonwebtoken');

const secret = 'cookmaster';

function createToken(payload) {
  const headers = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, headers);

  return token;
}

module.exports = createToken;
