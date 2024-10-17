const jwt = require('jsonwebtoken');
const Admin = require('../model/adminSchema');

exports.auth = async (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }
  token = token.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    const user = await Admin.findOne({ email: decoded.email });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to authenticate token' });
  }
};
