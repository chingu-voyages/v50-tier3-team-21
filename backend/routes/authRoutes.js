const { Router } = require('express');
const authController = require('../controllers/authController');
const router = Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

module.exports = router;