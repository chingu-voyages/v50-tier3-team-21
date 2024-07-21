const express = require('express');
const { signup,login, logout, refreshToken } = require('../controllers/authController');
const { protect } = require('../middlewares/authorization');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/refresh-token',refreshToken);

module.exports = router;