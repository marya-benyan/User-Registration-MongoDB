const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Token from cookie:', token); // Add this line
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.log('Token verification error:', error.message); // Add this line
      res.status(401).json({ message: 'Not authorized' });
    }
  };

module.exports = { protect };