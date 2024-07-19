const express = require('express');
const { signup,login, logout, verifyToken } = require('../controllers/authController');
const { protect } = require('../middlewares/authorization');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/verify-token', verifyToken);

module.exports = router;