const express = require('express');
const { signup,login, logout, refreshToken, deleteUser } = require('../controllers/authController');
const { protect } = require('../middlewares/authorization');
const { signupValidation } = require('../middlewares/validations/signupValidation');
const router = express.Router();

router.delete('/', deleteUser);
router.post('/signup', signupValidation, signup);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/refresh-token',refreshToken);

module.exports = router;