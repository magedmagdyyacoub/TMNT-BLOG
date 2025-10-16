const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing token' });

  const token = authHeader.split(' ')[1];
  try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = { id: decoded.id, role: decoded.role };

    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
