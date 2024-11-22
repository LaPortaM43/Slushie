//routes/authRoutes.js

import express from 'express';
const router = express.Router();
import { registerCustomer, loginCustomer, logoutCustomer } from '../controllers/authController.js';

// Auth Routes
router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router.post('/logout', logoutCustomer); 

export default router;  