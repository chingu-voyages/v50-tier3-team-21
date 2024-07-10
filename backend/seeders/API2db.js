// fetch data from an API

const apiURL = "https://menus-api.vercel.app/";

fetch(apiURL)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    insertData(data);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// insert data into the database
const db = require('../models');

async function insertData(data) {
    try {
      await db.sequelize.sync({ force: true });
      console.log("Database synced successfully.");
      const categories = Object.keys(data.pagination);
  
      for (let categoryName of categories) {
        let [categoryRecord, created] = await db.Category.findOrCreate({
          where: { name: categoryName },
          defaults: { name: categoryName }
        });
  
        for (let item of data[categoryName]) {
          // restaurant data
          let restaurant = {
            name: item.name,
            country: item.country,
            latitude: item.latitude,
            longitude: item.longitude,
          };
  
          // fooditem data
          let foodItem = {
            name: item.dsc,
            imageUrl: item.img,
            price: item.price,
          };
  
          // add restaurant to database if not there
          let [restaurantRecord, restaurantCreated] = await db.Restaurant.findOrCreate({
            where: { name: restaurant.name },
            defaults: restaurant
          });
  
          // add foodItem to database if not there
          let [foodItemRecord, foodItemCreated] = await db.FoodItem.findOrCreate({
            where: { name: foodItem.name, restaurantId: restaurantRecord.id },
            defaults: {
              name: foodItem.name,
              imageUrl: foodItem.imageUrl,
              price: foodItem.price,
              restaurantId: restaurantRecord.id
            }
          });
  
          // create association in FoodItemCategory table
          await db.FoodItemCategory.findOrCreate({
            where: {
              foodItemId: foodItemRecord.id,
              categoryId: categoryRecord.id
            },
            defaults: {
              foodItemId: foodItemRecord.id,
              categoryId: categoryRecord.id
            }
          });
  
          console.log('Inserted:', { restaurant, category: categoryRecord, foodItem });
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }