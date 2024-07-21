const jwt = require("jsonwebtoken");

// generate token function from .env settings
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  module.exports = { generateToken }