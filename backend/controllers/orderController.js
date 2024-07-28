const { Order, OrderFoodItem, FoodItem } = require('../models'); // Adjust the path to your models


// Controller to create an order
const createOrder = async (req, res) => {
    const {
        deliveryAddress, deliveryDate, deliveryTime, foodItems, tip, finalized } = req.body;

    const userId  = req.user.id;
    console.log(userId)
    try {

        if (!userId) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new order
        const newOrder = await Order.create({
            userId,
            deliveryAddress,
            deliveryDate,
            deliveryTime,
            tip: tip || 0, // Use provided tip or default to 0
            finalized: finalized || false
        });

        // Create order food items
        const orderFoodItems = foodItems.map(item => ({
            orderId: newOrder.id,
            itemId: item.itemId,
            quantity: item.quantity
        }));

        await OrderFoodItem.bulkCreate(orderFoodItems);

        res.status(201).json({ message: 'Order created successfully', orderId: newOrder.id });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};


// Controller to get orders by user
const getOrderByUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await Order.findAll({
            where: { userId },
            include: [
                {
                    model: OrderFoodItem,
                    as: 'orderFoodItems',
                    include: [
                        {
                            model: FoodItem,
                            as: 'item',
                        }
                    ]
                }
            ]
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get orders', error: error.message });
    }
};


// Controller to cancel an order
const cancelOrder = async (req, res) => {

    const { orderId } = req.params;
    const userId = req.user.id;
    
    
    try {

        const  orderDetails = await Order.findOne({
            where: { id: orderId },
        });
        
        if (!orderDetails) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Update the order to set cancelled to true
        if ( userId !== orderDetails.userId) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }

        if (orderDetails.cancelled) {
            return res.status(400).json({ message: 'Order already cancelled' });
        }

        const result = await Order.update(
            { cancelled: true },
            { where: { id: orderId } }
        );

        if (result[0] === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to cancel order', error: error.message });
    }
};

module.exports = { createOrder, getOrderByUser, cancelOrder };