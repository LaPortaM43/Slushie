const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const { getAllBranches, getBranchById, createBranch, updateBranch, deleteBranch } = require('../controllers/branches');


router.use(authenticateToken);

// Branch Routes
router.get('/', getAllBranches);
router.get('/:id', getBranchById);
router.post('/', createBranch);
router.put('/:id', updateBranch);
router.delete('/:id', deleteBranch);

module.exports = router;
