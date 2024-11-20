const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const { getAllFlavors, getFlavorById, createFlavor, updateFlavor, deleteFlavor } = require('../controllers/flavorController.js');

router.use(authenticateToken);

// Flavor Routes
router.get('/', getAllFlavors);
router.get('/:id', getFlavorById);
router.post('/', createFlavor);
router.put('/:id', updateFlavor);
router.delete('/:id', deleteFlavor);

module.exports = router;
