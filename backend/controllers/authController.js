const db = require("../models"); // Ensure models are required correctly
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Token generation helper function
const generateToken = (payload, expiresIn) => {
   return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn }
   );
}

const refreshToken = async (req, res, next) => {

  // Get refresh token from cookies
  const { refreshToken: oldRefreshToken } = req.cookies;

  // Check if there is a refresh token
  if (!oldRefreshToken) {
    return res.status(401).json({
      status: "fail",
      message: "No refresh token provided",
    });
  }

  // Verify old refresh token
  jwt.verify(oldRefreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid refresh token",
      });
    }

    // Generate new tokens
    const newToken = generateToken(
      { id: decoded.id },
      process.env.JWT_EXPIRES_IN
    );
    const newRefreshToken = generateToken(
      { id: decoded.id },
      process.env.JWT_REFRESH_EXPIRES_IN
    );

    // Set new token and refreshToken in cookies
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      status: "success",
    });
  });
};

// Signup controller
const signup = async (req, res, next) => {
  const { username, email, password, confirmPassword, firstName, lastName, contact } = req.body;

  if (password.length < 7) {
      return res.status(400).json({
          status: 'fail',
          message: 'Password must be at least 7 characters long',
      });
  }

  if (password !== confirmPassword) {
      return res.status(400).json({
          status: 'fail',
          message: 'Passwords do not match',
      });
  }

  try {
      const newUser = await db.User.create({
          username,
          email,
          password
      });

      const result = newUser.toJSON();
      delete result.password;

      const token = generateToken({ id: result.id }, process.env.JWT_EXPIRES_IN);
      const refreshToken = generateToken({ id: result.id }, process.env.JWT_REFRESH_EXPIRES_IN);

      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

      return res.status(201).json({
          status: 'success',
          message: 'User created successfully',
          data: result,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          status: 'fail',
          message: 'Failed to create user',
          error: error.message,
      });
  }
}

// Login controller
const login = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if username or email and password are provided
  if ((!username && !email) || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide username or email and password",
    });
  }

  try {
    // Check if user exists
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

    // Compare passwords
    const isMatch = await bcrypt.compare(password, result.password);

    if (!isMatch) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect password",
      });
    }

    const token = generateToken(
      { id: result.id },
      process.env.JWT_EXPIRES_IN
    );

    const refreshToken = generateToken(
      { id: result.id },
      process.env.JWT_REFRESH_EXPIRES_IN
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Failed to login user",
      error: error.message,
    });
  }
}

// Logout controller
const logout = async (req, res, next) => {
   res.clearCookie('token');
   res.clearCookie('refreshToken');
   res.status(200).json({
       status: 'success',
       message: 'User logged out successfully',
   });
};

// Profile controller
const profile = async (req, res, next) => {
   try {
      const user = await db.User.findByPk(req.user.id, {
          attributes: { exclude: ['password'] }
      });

      if (!user) {
          return res.status(404).json({
              status: 'fail',
              message: 'User not found',
          });
      }

      return res.status(200).json({
          status: 'success',
          data: user,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          status: 'fail',
          message: 'Failed to fetch user profile',
          error: error.message,
      });
  }
};

// Authorization middleware
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

module.exports = { signup, login, profile, logout, refreshToken, protect };
