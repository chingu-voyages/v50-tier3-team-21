const db = require("../models"); // Make sure to require your models
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwt");
const UserCreator = require("../services/auth/userCreator");

// Refresh token
const refreshToken = async (req, res, next) => {
  const { token: oldToken, refreshToken: oldRefreshToken } = req.cookies;

  if (!oldToken && !oldRefreshToken) {
    return res
      .status(401)
      .json({ status: "fail", message: "No token provided" });
  }

  try {
    // Verify access token
    const decoded = jwt.verify(oldToken, process.env.JWT_SECRET);

    // Access token is valid, generate new refresh token
    const newRefreshToken = generateToken(
      { id: decoded.id },
      process.env.JWT_REFRESH_SECRET,
      process.env.JWT_REFRESH_EXPIRES_IN,
    );

    // Set new refresh token in cookies
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res
      .status(200)
      .json({
        status: "success",
        message: "Token is valid, new refresh token generated",
      });
  } catch (error) {
    // Token is invalid, verify the refresh token
    try {
      const decodedRefresh = jwt.verify(
        oldRefreshToken,
        process.env.JWT_REFRESH_SECRET,
      );
      if (!decodedRefresh) {
        return res
          .status(401)
          .json({ status: "fail", message: "Invalid refresh token" });
      }

      // Generate new tokens
      const newToken = generateToken(
        { id: decodedRefresh.id },
        process.env.JWT_SECRET,
        process.env.JWT_EXPIRES_IN,
      );
      const newRefreshToken = generateToken(
        { id: decodedRefresh.id },
        process.env.JWT_REFRESH_SECRET,
        process.env.JWT_REFRESH_EXPIRES_IN,
      );

      // Set new tokens in cookies
      res.cookie("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return res
        .status(200)
        .json({ status: "success", message: "Token refreshed successfully" });
    } catch (refreshError) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid token and refresh token" });
    }
  }
};

// signup controller
const signup = async (req, res, next) => {
  const body = req.body;

  // const result = await db.Transaction.create({
  //   amount: 100, type: 'credit', accountId: 3, status: 'completed', paymentIntentId: '123',
  // });

  // return res.status(200).json(result);
  try {
   const response = await new UserCreator(db, body).perform();
   
    if (response) {
      const { newUser, account } = response;
      const result = newUser.toJSON();
      delete result.password;
      delete result.deletedAt;
  
      result.token = generateToken(
        { id: result.id },
        process.env.JWT_SECRET,
        process.env.JWT_EXPIRES_IN,
      );
  
      if (!result) {
        return res.status(400).json({
          status: "fail",
          message: "Failed to create user",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "User Successfully created",
        data: { result, account }
      });
    }
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Failed to create user",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await db.User.destroy({
      where: { username: req.body.username},
    });

    return res.status(204);
  } catch (err) {
    throw new Error(err);
  }
};

// Login controller
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

    const isMatch = await bcrypt.compare(password, result.password);

    if (!isMatch) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect password",
      });
    }

    const token = generateToken(
      { id: result.id },
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN,
    );
    const refreshToken = generateToken(
      { id: result.id },
      process.env.JWT_REFRESH_SECRET,
      process.env.JWT_REFRESH_EXPIRES_IN,
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
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
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
  });
  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
  });

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
module.exports = { signup, login, profile, logout, refreshToken, protect, deleteUser };
