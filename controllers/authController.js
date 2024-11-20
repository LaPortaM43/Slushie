// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Customer } = require('../models/customer.js');  
require('dotenv').config();

exports.registerCustomer = async (req, res) => {
  try {
    const { customerID, customerName, customerEmail, customerPassword, customerAddress } = req.body;

    // Check if the customer already exists by email
    const existingCustomer = await Customer.findOne({ where: { customerEmail } });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Customer already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(customerPassword, 10);

    // Create the new customer
    const newCustomer = await Customer.create({
      customerID,
      customerName,
      customerEmail,
      customerPassword: hashedPassword,
      customerAddress,
    });

    // Return success response with the newly created customer, excluding password
    res.status(201).json({
      customerID: newCustomer.customerID,
      customerName: newCustomer.customerName,
      customerEmail: newCustomer.customerEmail,
      customerAddress: newCustomer.customerAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register customer' });
  }
};

exports.loginCustomer = async (req, res) => {
  try {
    const { customerEmail, customerPassword } = req.body;

    // Find the customer by email
    const customer = await Customer.findOne({ where: { customerEmail } });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(customerPassword, customer.customerPassword);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Create a JWT token for the authenticated customer
    const token = jwt.sign(
      { customerID: customer.customerID, customerName: customer.customerName },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return the token to the customer
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};

exports.logoutCustomer = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};
