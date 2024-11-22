// routes/flavorRoutes.js

import express from 'express';
const router = express.Router();
import { authenticateToken } from '../middleware/authenticateToken.js';
import { getAllFlavors, getFlavorById, createFlavor, updateFlavor, deleteFlavor }from '../controllers/flavorController.js';
// router.use(authenticateToken);

// Flavor Routes
router.get('/', getAllFlavors);
router.get('/:id', getFlavorById);
router.post('/', createFlavor);
router.put('/:id', updateFlavor);
router.delete('/:id', deleteFlavor);

export default router; 