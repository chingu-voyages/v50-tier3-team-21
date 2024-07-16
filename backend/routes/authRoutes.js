const express = require('express');
const { signup, login, profile, logout, refreshToken, protect } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, profile);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

module.exports = router;