const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const db = require('./models');
const authRouter = require('./routes/authRoutes');


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);

// Sync database
db.sequelize.sync().then((req) => {  
  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Hello World',
  });
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


