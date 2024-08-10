const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

dotenv.config();

const swaggerOptions = require('./swagger.json');
const app = express();
const db = require('./models');

// Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
const authRouter = require('./routes/authRoutes');
const profileRouter = require('./routes/profileRoutes');
const foodItemsRouter = require('./routes/foodItemsRoutes');
const foodCategoriesRouter = require('./routes/foodCategoriesRoutes');
const nearbyRestaurantRouter = require('./routes/nearbyRestaurantRoutes');
const resetPasswordRouter = require('./routes/resetPasswordRoutes');

const walletRouter = require('./routes/walletRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const { handleStripeWebhook } = require('./controllers/walletController');
const { protect } = require('./middlewares/authorization');

const orderRouter = require('./routes/orderRoutes');

const PORT = process.env.PORT || 3000;

app.use('/api/webhook', express.raw({type: 'application/json'}), handleStripeWebhook)

app.use(express.json());
app.use(cookieParser());

// CORS Middleware with debugging headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  console.log('CORS headers set for request');
  next();
});

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/fooditems', foodItemsRouter);
app.use('/api/foodCategories', foodCategoriesRouter);
app.use('/api/nearbyrestaurants', nearbyRestaurantRouter);
app.use('/api/resetpassword', resetPasswordRouter);
app.use('/api/wallets', protect, walletRouter);
app.use('/api/transactions', protect, transactionRouter);
app.use('/api/order', orderRouter);

// Sync database
db.sequelize.sync().then(() => {
  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to Hungry Hippo API. To see the documentation, go to http://localhost:3000/api/docs . To see it on the deployed server, go to https://hungryhippo.onrender.com/api/docs',
    });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
