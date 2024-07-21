const db = require('../models');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../helpers/jwt');

// demo user
let user = {
  id: "12345",
  email: "test@example.com",
  password: "password"
};

const getForgotPassword = async (req, res, next) => {
  res.render('forgotPassword');
};

const postForgotPassword = async (req, res, next) => {
  const { email } = req.body;

  // make sure user exists in the database
  if (email !== user.email) {
    res.send('User not found');
    return;
  }

  // user exists, create a one-time link valid for 15 minutes
  const payload = {
    email: user.email,
    id: user.id
  };

  payload.token = generateToken({ id: payload.id });

  const link = `http://localhost:3000/resetPassword/${payload.id}/${token}`;
  console.log(link);
  res.send('Password reset link sent to your email');
};

const getResetPassword = async (req, res, next) => {
  const { id, token } = req.params;

  // check if id exists
  if (id !== user.id) {
    res.send('Invalid id');
    return;
  }

  try {
    // verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.id !== id) {
      res.send('Invalid token');
      return;
    }

    res.status(201).json({
      status: 'success',
      message: 'passwordReset',
      data: { email: user.email }
    });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

const postResetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;

  // check if this id exists in the database
  if (id !== user.id) {
    res.send('Invalid id or token');
    return;
  }

  try {
    // verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.id !== id) {
      res.send('Invalid token');
      return;
    }

    // validate password and confirmPassword, they should match
    if (password !== confirmPassword) {
      res.send('Passwords do not match');
      return;
    }

    // update the user's password
    user.password = password;
    res.send('Password updated successfully');
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

module.exports = {
  getForgotPassword,
  postForgotPassword,
  getResetPassword,
  postResetPassword
};
