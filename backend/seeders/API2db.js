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

function insertData(data) {
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Database synced successfully.");
    const categories = Object.keys(data.pagination);
    // console.log(categories)

    for (let category of categories) {
      console.log(category);

      for (let item of data[category]) {
        // console log the values from
        /* {
                id: 'ribs-brisket-and-burnt-ends',
                img: 'https://goldbelly.imgix.net/uploads/showcase_media_asset/image/79619/joes-kc-ribs-brisket-and-burnt-ends.6710e994980e485e6441b794717ad6fb.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1',
                name: "Joe's KC BBQ",
                dsc: "Joe's KC Ribs, Brisket & Burnt Ends",
                price: 110.99,
                rate: 4,
                country: 'Kansas City, KS',
                latitude: 39.08532,
                longitude: -94.688505
                }
   */
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
          restaurant: item.name,
          price: item.price,
          category: category,
        };

        console.log(restaurant);
        console.log(foodItem);
        break;
      }
      break;
    }
  });
}
