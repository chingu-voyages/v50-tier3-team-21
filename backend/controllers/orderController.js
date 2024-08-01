const { Order, OrderFoodItem, FoodItem } = require('../models'); // Adjust the path to your models


// Controller to create an order
const createOrder = async (req, res) => {
    const {
        deliveryAddress, deliveryDate, deliveryTime, foodItems, deliveryCost, tip, finalized } = req.body;

    const userId  = req.user.id;
    console.log(userId)
    try {

        if (!userId) {
            return res.status(404).json({ 
                status: 'fail',
                message: 'User not found'
            });
        }

        // Create a new order
        const newOrder = await Order.create({
            userId,
            deliveryAddress,
            deliveryDate,
            deliveryTime,
            deliveryCost: deliveryCost || 0,
            tip: tip || 0,
            finalized: finalized || false
        });

        // Create order food items
        const orderFoodItems = foodItems.map(item => ({
            orderId: newOrder.id,
            itemId: item.itemId,
            quantity: item.quantity
        }));

        await OrderFoodItem.bulkCreate(orderFoodItems);

        res.status(201).json({
            status: 'success',
            message: 'Order created successfully',
            orderId: newOrder.id
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to create order',
            error: error.message
        });
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

        res.status(200).json({
            status: 'success',
            message: 'Orders retrieved successfully',
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to get orders',
            error: error.message
        });
    }
};

// Controller to get order by id
const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user.id;
    try {
        const order = await Order.findOne({
            where: { id: orderId },
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
        if (!order) {
            return res.status(404).json({
                status: 'fail',
                message: 'Order not found'
            });
        }
        if (userId !== order.userId) {
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized user'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Order retrieved successfully',
            data: order
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to get order',
            error: error.message
        });
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
            return res.status(404).json({
                status: 'fail',
                message: 'Order not found'
            });
        }
        
        // Update the order to set cancelled to true
        if ( userId !== orderDetails.userId) {
            return res.status(401).json({
                status: 'fail', 
                message: 'Unauthorized user'
            });
        }

        if (orderDetails.cancelled) {
            return res.status(400).json({
                status: 'fail', 
                message: 'Order already cancelled'
            });
        }

        const result = await Order.update(
            { cancelled: true },
            { where: { id: orderId } }
        );

        if (result[0] === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Order not found'
            });
        }

        res.status(200).json({
            status: 'success', 
            message: 'Order cancelled successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to cancel order',
            error: error.message 
        });
    }
};

// Controller to update an order
const updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user.id;
    const { deliveryAddress, deliveryDate, deliveryTime, foodItems, deliveryCost, tip, finalized } = req.body;

    try {
        const orderDetails = await Order.findOne({
            where: { id: orderId },
        });

        if (!orderDetails) {
            return res.status(404).json({
                status: 'fail',
                message: 'Order not found'
            });
        }

        if (userId !== orderDetails.userId) {
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized user'
            });
        }

        await Order.update(
            {
                deliveryAddress: deliveryAddress || orderDetails.deliveryAddress,
                deliveryDate: deliveryDate || orderDetails.deliveryDate,
                deliveryTime: deliveryTime || orderDetails.deliveryTime,
                deliveryCost: deliveryCost !== undefined ? deliveryCost : orderDetails.deliveryCost,
                tip: tip !== undefined ? tip : orderDetails.tip,
                finalized: finalized !== undefined ? finalized : orderDetails.finalized
            },
            { where: { id: orderId } }
        );

        if (foodItems && foodItems.length > 0) {
            await OrderFoodItem.destroy({ where: { orderId: orderId } });

            const orderFoodItems = foodItems.map(item => ({
                orderId: orderId,
                itemId: item.itemId,
                quantity: item.quantity
            }));

            await OrderFoodItem.bulkCreate(orderFoodItems);
        }

        res.status(200).json({
            status: 'success',
            message: 'Order updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to update order',
            error: error.message
        });
    }
};


module.exports = {
    createOrder,
    createOrder,
    getOrderByUser,
    getOrderById,
    cancelOrder,
    updateOrder
};