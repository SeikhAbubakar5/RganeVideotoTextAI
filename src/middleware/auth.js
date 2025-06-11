require('dotenv').config({ path: 'src/.env' });
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = { requireAuth };