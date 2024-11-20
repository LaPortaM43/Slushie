//routes/orders.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken.js');
const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController.js');

router.use(authenticateToken);

// Order Routes
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
