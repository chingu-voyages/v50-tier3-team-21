const db = require("../models"); // Make sure to require your models
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwt");
const { sendEmail } = require("../middlewares/mail");

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

    return res.status(200).json({
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

  // password length validation
  if (body.password.length < 7) {
    return res.status(400).json({
      status: "fail",
      message: "Password must be at least 7 characters long",
    });
  }
  // password confirmation validation
  if (body.password !== body.confirmPassword) {
    return res.status(400).json({
      status: "fail",
      message: "Password and confirm password do not match",
    });
  }
  // attempt to create user in db (unsuccessful if doesn't pass validations)
  try {
    const newUser = await db.User.create({
      username: body.username,
      email: body.email,
      password: body.password,
      confirmPassword: body.confirmPassword,
      firstName: body.firstName || null,
      lastName: body.lastName || null,
      contact: body.contact || null,
    });

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

    // TODO: send email to user

    await sendEmail(
      result.email,
      "Welcome to Hungry Hippo!",
      `<p>Dear <strong>${result.username}</strong>,</p><p>Welcome to Hungry Hippo! We're excited to have you on board.</p>`
    );

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
module.exports = { signup, login, profile, logout, refreshToken, protect };
