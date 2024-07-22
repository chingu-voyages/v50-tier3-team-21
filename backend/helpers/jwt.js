const jwt = require("jsonwebtoken");

// generate token function from .env settings
const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(
     payload,
     secret,
     { expiresIn }
  );
}

module.exports = { generateToken }