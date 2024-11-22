// routes/orderRoutes.js

import express from 'express';
const router = express.Router();
import { authenticateToken } from '../middleware/authenticateToken.js';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orderController.js';
// router.use(authenticateToken);

// Order Routes
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router; 