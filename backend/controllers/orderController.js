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
                            attributes: ['id', 'name', 'price'] // Adjust attributes as needed
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

module.exports = { createOrder, getOrderByUser };