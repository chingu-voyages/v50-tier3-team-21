const db = require("../models"); // Make sure to require your models
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// generate token function from .env settings
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// generate refresh token
const refreshToken = async (req, res, next) => {
  const { token: oldToken, refreshToken: oldRefreshToken } = req.cookies;

  if (!oldToken && !oldRefreshToken) {
    return res.status(401).json({
      status: "fail",
      message: "No token provided",
    });
  }

  try {
    // Decode refresh token
    const refreshDecoded = jwt.decode(oldRefreshToken);

    // Generate new tokens
    const newToken = generateToken(
      { id: refreshDecoded.id },
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    );
    const newRefreshToken = generateToken(
      { id: refreshDecoded.id },
      process.env.JWT_SECRET,
      process.env.JWT_REFRESH_EXPIRES_IN
    );

    // Set new tokens in cookies
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({
      status: "success",
      message: "Token refreshed successfully",
    });
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid refresh token",
    });
  }
};

// signup controller
const signup = async (req, res, next) => {
  const body = req.body;
  console.log(body);

  // password length validation
  if (body.password.length < 7) {
    return res.status(400).json({
      status: "fail",
      message: "Password must be at least 7 characters long",
    });
  }
  // attempt to create user in db (unsuccessful if doesn't pass validations)
  try {
    const newUser = await db.User.create({
      username: body.username,
      email: body.email,
      password: body.password,
      confirmPassword: body.confirmPassword,
    });

    const result = newUser.toJSON();
    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
      id: result.id,
    });

    if (!result) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to create user",
      });
    }

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Failed to create user",
      error: error.message,
    });
  }
};

const login = async (req, res, next) => {
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide username or email and password",
    });
  }

  try {
    const condition = username ? { username } : { email };

    const result = await db.User.findOne({
      where: condition,
    });

    if (!result) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or username",
      });
    }

    if (!result) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or username",
      });
    }

    const isMatch = await bcrypt.compare(password, result.password);

    if (!isMatch) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect password",
      });
    }

    const token = generateToken({
      id: result.id,
    });

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Failed to login user",
      error: error.message,
    });
  }
};

const logout = async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    message: "User logged out successfully",
  });
};

const profile = async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    message: "User profile retrieved successfully",
  });
};

const protect = async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    message: "User protected successfully",
  });
};
module.exports = { signup, login, profile, logout, refreshToken, protect };
