// routes/customerRoutes.js

import express from 'express';
const router = express.Router();
import { authenticateToken } from '../middleware/authenticateToken.js';
import { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer }from '../controllers/customerController.js';
// router.use(authenticateToken);

// Customer Routes
router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router; 