// check api data
const apiURL = "https://menus-api.vercel.app/";

fetch(apiURL)
  .then(response => response.json())
  .then(foods => {
    // Restaurants dictionary
    const restaurants = {};

    // Food keys
    const foodKeys = Object.keys(foods.pagination);
    let foodItems = [];
    let count = 0;

    foodKeys.forEach(foodKey => {
      foods[foodKey].forEach(food => {
        count++;

        // Count restaurants
        if (!restaurants[food.name]) {
          restaurants[food.name] = 1;
        } else {
          restaurants[food.name]++;
        }

        // Add to unique food items
        const foodItemKey = `${food.dsc}-${food.name}`;
        if (!foodItems.includes(foodItemKey)) {
          foodItems.push(foodItemKey);
        }

        // Uncomment the line below to print food details
        // console.log(`${food.name} -> $${food.price} @ -->${food.country}<`);
      });
    });

    // Results
    const report ={
      numberOfFoodItems: foodItems.length,
      numberOfRestaurants: Object.keys(restaurants).length,
      numberOfCategories:foodKeys.length,
    }
    console.table(report);
  })
  .catch(error => {
    console.log("Error:", error);
  });


const db = require("../models");

const report = {};

db.sequelize.sync().then(() => {
  // check fooditems if there are duplicates
 const foodItemsPromise =db.FoodItem.findAll().then((foodItems) => {
   // check if there are duplicates - only if name and restaurantId are the same
    
    const foodItemsMap = foodItems.reduce((map, foodItem) => {
      map[`${foodItem.name}-${foodItem.restaurantId}`] = foodItem;
      return map;
    }, {});

    const foodItemNames = Object.keys(foodItemsMap);
    const foodItemNamesSet = new Set(foodItemNames);
    // add number of items to report
    report.numberOfFoodItems = foodItems.length;

    if (foodItemNames.length !== foodItemNamesSet.size) {
      console.log("There are duplicates in food items.");
    } else {
      console.log("There are no duplicates in food items.");
    }

    // check restaurants if there are duplicates
    const restaurantsPromise = db.Restaurant.findAll().then((restaurants) => {
      const restaurantsMap = restaurants.reduce((map, restaurant) => {
        map[restaurant.name] = restaurant;
        return map;
      }, {});
      const restaurantNames = Object.keys(restaurantsMap);
      const restaurantNamesSet = new Set(restaurantNames);

      // add number of items to report
      report.numberOfRestaurants = restaurantNames.length;

      if (restaurantNames.length !== restaurantNamesSet.size) {
        console.log("There are duplicates in restaurants.");
      } else {
        console.log("There are no duplicates in restaurants.");
      }
    });

    // check categories if there are duplicates
    const categoriesPromise = db.Category.findAll().then((categories) => {
      const categoryNames = categories.map((category) => category.name);
      const categoryNamesSet = new Set(categoryNames);

      // add number of items to report
      report.numberOfCategories = categoryNames.length;

      if (categoryNames.length !== categoryNamesSet.size) {
        console.log("There are duplicates in categories.");
      } else {
        console.log("There are no duplicates in categories.");
      }
    });


  // Wait for all promises to complete
  Promise.all([foodItemsPromise, restaurantsPromise, categoriesPromise])
    .then(() => {
      console.table(report);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});
});
