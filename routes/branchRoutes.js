// routes/branchRoutes.js

import express from 'express';
const router = express.Router();
import { authenticateToken } from '../middleware/authenticateToken.js';
import { getAllBranches, getBranchById, createBranch, updateBranch, deleteBranch } from '../controllers/branchController.js';
// router.use(authenticateToken);

// Branch Routes
router.get('/', getAllBranches);
router.get('/:id', getBranchById);
router.post('/', createBranch);
router.put('/:id', updateBranch);
router.delete('/:id', deleteBranch);

export default router; 
