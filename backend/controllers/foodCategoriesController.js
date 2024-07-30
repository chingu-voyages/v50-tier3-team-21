const db = require('../models');

const getFoodCategories = async (req, res, next) => {
  try {
    const categories = await db.Category.findAll();
    
    res.status(200).json({
      status: 'success',
      data: categories,
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

module.exports = { 
  getFoodCategories,
 };