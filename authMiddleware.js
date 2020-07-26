const jwt = require('jsonwebtoken');
const jwtSecret = require('./congin');

module.exports = (req, res, next) => {
  //get token from header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.send('authorization denied');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.send('Server Error!');
  }
};
