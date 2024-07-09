const express = require('express');
const app = express();

const db = require('./models');

const PORT = process.env.PORT || 3000;

// Sync database
db.sequelize.sync().then((req) => {

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


