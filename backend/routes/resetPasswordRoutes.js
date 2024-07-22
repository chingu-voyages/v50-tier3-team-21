const express = require('express');
const { sendPasswordResetEmail, resetPassword } = require('../controllers/resetPasswordController');
const router = express.Router();

router.post('/send-password-reset-email', sendPasswordResetEmail);
router.post('/reset-password', resetPassword);

module.exports = router;
