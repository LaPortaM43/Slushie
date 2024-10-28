//routes/user.js
const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:userId', authenticateToken, userController.getUserProfile);

module.exports = router;
