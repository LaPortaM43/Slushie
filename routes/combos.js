const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const { getAllCombos, getComboById, createCombo, updateCombo, deleteCombo } = require('../controllers/comboController.js');

router.use(authenticateToken);

// Combo Routes
router.get('/', getAllCombos);
router.get('/:id', getComboById);
router.post('/', createCombo);
router.put('/:id', updateCombo);
router.delete('/:id', deleteCombo);

module.exports = router;
