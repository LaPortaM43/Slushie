//routes/orders.js
const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Place a new order
router.post('/', authenticateToken, orderController.createOrder);

// Get all orders
router.get('/', authenticateToken, orderController.getAllOrders);

// Get a specific order by ID
router.get('/:id', authenticateToken, orderController.getOrderById);

module.exports = router;
