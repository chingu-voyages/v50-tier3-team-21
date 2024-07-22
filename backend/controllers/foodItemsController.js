const db = require('../models');

const getFoodItems = async (req, res, next) => {
  try {
    const { foodItemId, categoryId, restaurantId, country} = req.query;
    
       const foodItemWhere = {};
       if (foodItemId) {
           foodItemWhere.id = foodItemId;
       }
       if (restaurantId) {
           foodItemWhere.restaurantId = restaurantId;
       }

       const restaurantWhere = {};
       if (country) {
           restaurantWhere.country = country;
       }

       const categoryInclude = [];
       if (categoryId) {
           categoryInclude.push({
               model: db.Category,
               where: { id: categoryId },
               through: { attributes: [] } 
           });
       } else {
           categoryInclude.push({
               model: db.Category,
               through: { attributes: [] }
           });
       }

       const foodItems = await db.FoodItem.findAll({
           where: foodItemWhere,
           include: [
               {
                   model: db.Restaurant,
                   as: 'restaurant',
                   where: restaurantWhere
               },
               ...categoryInclude
           ]
       });
    
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

module.exports = { 
  getFoodItems,
 };