const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// Create a new order
router.post('/', protect, async (req, res) => {
    console.log('Request body:', req.body); // Add this line
    console.log('Received token:', req.cookies.token); // Add this line
    const { products, totalAmount } = req.body;
  
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products array is required' });
    }
  
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: 'Valid total amount is required' });
    }
  
    try {
      const order = await Order.create({
        user: req.user.id,
        products,
        totalAmount,
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Get all orders for the authenticated user
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;