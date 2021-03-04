const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({message: 'нет токена'});
    }
    const decoded = jwt.verify(token, config.get('secret'));
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({message: 'auth server error'});
  }
};
