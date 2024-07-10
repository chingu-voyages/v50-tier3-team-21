const db = require('../models');

const apiURL = 'https://menus-api.vercel.app/';

const fetchApiData = async () => {
  try {
    const response = await fetch(apiURL);
    const foods = await response.json();

    const restaurants = {};
    const foodKeys = Object.keys(foods.pagination);
    let foodItems = [];
    let count = 0;

    foodKeys.forEach(foodKey => {
      foods[foodKey].forEach(food => {
        count++;

        if (!restaurants[food.name]) {
          restaurants[food.name] = 1;
        } else {
          restaurants[food.name]++;
        }

        const foodItemKey = `${food.dsc}-${food.name}`;
        if (!foodItems.includes(foodItemKey)) {
          foodItems.push(foodItemKey);
        }
      });
    });

    return {
      apiFoodCount: count,
      apiUniqueFoodItems: foodItems.length,
      apiRestaurants: Object.keys(restaurants).length,
      apiFoodCategories: foodKeys.length,
    };
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};

const fetchDbData = async () => {
  await db.sequelize.sync();
  
  const report = {};

  const foodItems = await db.FoodItem.findAll();
  const foodItemsMap = foodItems.reduce((map, foodItem) => {
    const key = `${foodItem.name}-${foodItem.restaurantId}`;
    map[key] = map[key] || [];
    map[key].push(foodItem);
    return map;
  }, {});

  const duplicateFoodItems = Object.values(foodItemsMap).filter(items => items.length > 1);

  report.numberOfFoodItems = foodItems.length;
  report.duplicateFoodItems = duplicateFoodItems.length > 0;

  const restaurants = await db.Restaurant.findAll();
  const restaurantNames = restaurants.map(restaurant => restaurant.name);
  const duplicateRestaurants = restaurantNames.filter((name, index, self) => self.indexOf(name) !== index);

  report.numberOfRestaurants = restaurants.length;
  report.duplicateRestaurants = duplicateRestaurants.length > 0;

  const categories = await db.Category.findAll();
  const categoryNames = categories.map(category => category.name);
  const duplicateCategories = categoryNames.filter((name, index, self) => self.indexOf(name) !== index);

  report.numberOfCategories = categories.length;
  report.duplicateCategories = duplicateCategories.length > 0;

  return report;
};

const main = async () => {
  const apiData = await fetchApiData();
  const dbData = await fetchDbData();

  if (apiData && dbData) {
    
      console.table(apiData),
      console.table(dbData)
  } else {
    console.log('Failed to fetch all data.');
  }
};

main().catch(error => {
  console.log('Error:', error);
});
