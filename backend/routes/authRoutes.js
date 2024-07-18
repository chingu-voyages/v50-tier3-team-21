const express = require('express');
const { signup,login,profile,logout,protect,verifyToken } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, profile);
router.post('/logout', protect, logout);
router.get('/verify-token', verifyToken);

module.exports = router;