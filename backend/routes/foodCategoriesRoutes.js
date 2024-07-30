const express = require('express');
const { getFoodCategories } = require('../controllers/foodCategoriesController');
const { protect } = require('../middlewares/authorization');
const router = express.Router();

router.get('/', protect, getFoodCategories);

module.exports = router;