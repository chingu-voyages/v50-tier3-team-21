const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/jwt');

// Send password reset email with token
const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }
    const token = generateToken({ id: user.id }, process.env.JWT_SECRET,  process.env.JWT_RESET_EXPIRES_IN);
    // Send email with token and link to reset password
    // ...
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
    return res.status(200).json({ status: 'success', message: 'Password reset email sent', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'fail', message: 'Failed to send password reset email' });
  }
};

// Reset password with token
const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ status: 'fail', message: 'Token must be provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ status: 'fail', message: 'Passwords do not match' });
    }
    user.password = password
    user.confirmPassword = confirmPassword
    await user.save();
    return res.status(200).json({ status: 'success', message: 'Password reset successfully' });
    // delete cookie
    res.clearCookie('token');
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ status: 'fail', message: 'Invalid or expired token' });
    }
    console.error(error);
    return res.status(500).json({ status: 'fail', message: 'Failed to reset password' });
  }
};

module.exports = { sendPasswordResetEmail, resetPassword };
