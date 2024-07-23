const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const dotenv = require('dotenv');

dotenv.config();
const swaggerOptions = require('./swagger.json');
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
const db = require('./models');

// Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
const authRouter = require('./routes/authRoutes');
const profileRouter = require('./routes/profileRoutes');
const foodItemsRouter = require('./routes/foodItemsRoutes');
const nearbyRestaurantRouter = require('./routes/nearbyRestaurantRoutes');
const resetPasswordRouter = require('./routes/resetPasswordRoutes');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware
app.use(cookieParser());
app.use(cors({credentials: true, origin: process.env.FRONTEND_URL}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/fooditems', foodItemsRouter);
app.use('/api/nearbyrestaurants', nearbyRestaurantRouter);
app.use('/api/resetpassword', resetPasswordRouter);

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


