const express = require('express');
const { getFoodItems } = require('../controllers/foodItemsController');
const { protect } = require('../controllers/authController');
const router = express.Router();

router.get('/items', protect, getFoodItems);

module.exports = router;