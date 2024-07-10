const db = require("../models");

const report = {};

db.sequelize.sync().then(() => {
  // check fooditems if there are duplicates
 const foodItemsPromise =db.FoodItem.findAll().then((foodItems) => {
    const foodItemsMap = foodItems.reduce((map, foodItem) => {
      map[foodItem.name] = foodItem;
      return map;
    }, {});
    const foodItemNames = Object.keys(foodItemsMap);
    const foodItemNamesSet = new Set(foodItemNames);

    // add number of items to report
    report.numberOfFoodItems = foodItemNames.length;

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
      const categoriesMap = categories.reduce((map, category) => {
        map[category.name] = category;
        return map;
      }, {});
      const categoryNames = Object.keys(categoriesMap);
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
