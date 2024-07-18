const express = require('express');
const { signup,login,profile,logout,protect,refreshToken,checkToken } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, profile);
router.post('/logout', protect, logout);
router.post('/refresh-token', refreshToken);
router.get('/check-token', checkToken);

module.exports = router;