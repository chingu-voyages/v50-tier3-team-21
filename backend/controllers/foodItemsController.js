const db = require('../models');

const getFoodItems = async (req, res, next) => {
  try {
    const foodItems = await db.FoodItem.findAll(); // Assuming 'FoodItem' is your model for the food items
    res.status(200).json({
      status: 'success',
      data: foodItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to fetch food items',
      error: error.message,
    });
  }
}

module.exports = { getFoodItems };