const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

//  Create new order
//  POST /api/orders
router.post('/', protect, async (req, res) => {
    const { orderItems, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    }
    try {
        const order = new Order({
            user: req.user._id,
            orderItems,
            totalPrice
        });
        const createdOrder = await order.save();
        console.log('ORDER CREATED:', createdOrder._id);
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('ORDER CREATE ERROR:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//  Get logged in user orders
//  GET /api/orders/myorders
router.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//  Get all orders
// GET /api/orders
router.get('/', protect, require('../middleware/authMiddleware').admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
