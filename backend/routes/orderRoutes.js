const express = require('express');
const {
    createOrder,
    getOrderByUser,
    getOrderById,
    cancelOrder
} = require('../controllers/orderController');
const { protect } = require('../middlewares/authorization');
const router = express.Router();

router.post('/create-order', protect, createOrder);
router.get('/get-orders', protect, getOrderByUser);
router.get('/get-order/:orderId', protect, getOrderById);
router.put('/cancel/:orderId', protect, cancelOrder);
// TODO: add route for updating order

module.exports = router;