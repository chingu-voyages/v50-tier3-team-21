const express = require('express');
const { getNearbyRestaurants } = require('../controllers/nearbyRestaurantController');
const { protect } = require('../controllers/authController');
const router = express.Router();

router.get('/', protect, getNearbyRestaurants);

module.exports = router;