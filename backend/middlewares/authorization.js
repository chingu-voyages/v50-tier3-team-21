const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
      return res.status(401).json({
          status: 'fail',
          message: 'Access denied. No token provided.',
      });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(401).json({
              status: 'fail',
              message: 'Invalid token',
          });
      }

      req.user = decoded;
      next();
  });
}

module.exports = {
  protect,
};