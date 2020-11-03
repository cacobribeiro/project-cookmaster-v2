const jwt = require('jsonwebtoken');

const secret = 'cookmaster';

const validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const data = jwt.verify(token, secret);

    if (!data) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
