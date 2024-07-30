const express = require('express');
const { sendPasswordResetEmail, resetPassword, authorizeResetToken } = require('../controllers/resetPasswordController');
const router = express.Router();

router.post('/send-password-reset-email', sendPasswordResetEmail);
router.get('/reset-link/:token', authorizeResetToken);
router.post('/reset-password', resetPassword);

module.exports = router;
