// routes/comboRoutes.js

import express from 'express';
const router = express.Router();
import { authenticateToken } from '../middleware/authenticateToken.js';
import { getAllCombos, getComboById, createCombo, updateCombo, deleteCombo }from '../controllers/comboController.js';
// router.use(authenticateToken);

// Combo Routes
router.get('/', getAllCombos);
router.get('/:id', getComboById);
router.post('/', createCombo);
router.put('/:id', updateCombo);
router.delete('/:id', deleteCombo);

export default router; 