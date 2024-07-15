const { Router } = require('express');
const authController = require('../controllers/authController');
const router = Router();

router.route('/signup').post(authController.signup);
module.exports = router;