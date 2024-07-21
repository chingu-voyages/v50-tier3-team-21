const express = require('express');
const { getForgotPassword, postForgotPassword, getResetPassword, postResetPassword } = require('../controllers/resetPasswordController');
const { protect } = require('../middlewares/authorization');
const router = express.Router();

router.get('/forgotPassword', getForgotPassword);
router.post('/forgotPassword', postForgotPassword);
router.get('/resetPassword/:id/:token', protect, getResetPassword);
router.post('/resetPassword/:id/:token', protect, postResetPassword);


module.exports = router;