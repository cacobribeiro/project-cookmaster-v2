const jwt = require('jsonwebtoken');

const secret = 'cookmaster';

const validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    const data = jwt.verify(token, secret);

    const { iat, exp, password, ...userData } = data;

    req.user = userData;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
