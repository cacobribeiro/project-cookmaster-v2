const jwt = require('jsonwebtoken');

const secret = 'cookmaster';

function createToken(payload) {
  const headers = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const { password: _, ...userWithoutPass } = payload;
  const token = jwt.sign(userWithoutPass, secret, headers);

  return token;
}

module.exports = createToken;
