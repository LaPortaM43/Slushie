//auth.js
const express = require('express');
const router = express.Router();
const { registerCustomer, loginCustomer, logoutCustomer } = require('../controllers/auth');

// Auth Routes
router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router.post('/logout', logoutCustomer); // Optional logout endpoint

module.exports = router;
