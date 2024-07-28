const express = require('express');
const { createOrder, getOrderByUser, cancelOrder } = require('../controllers/orderController');
const { protect } = require('../middlewares/authorization');
const router = express.Router();

router.post('/create-order', protect, createOrder);
router.get('/get-orders', protect, getOrderByUser);
router.put('/cancel/:orderId', protect, cancelOrder);
module.exports = router;