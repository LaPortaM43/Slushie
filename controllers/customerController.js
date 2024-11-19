// controllers/customerController.js

const { Customer } = require('../models');

// Get all customers (GET)
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      attributes: { exclude: ['customerPassword'] }, 
    });
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve customers' });
  }
};

// Get customer by ID (GET)
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      attributes: { exclude: ['customerPassword'] }, 
    });

    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve customer' });
  }
};

// Create a new customer (POST)
exports.createCustomer = async (req, res) => {
  try {
    const { customerID, customerName, customerEmail, customerAddress, customerPassword } = req.body;

    if (!customerID || !customerName || !customerEmail || !customerAddress || !customerPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newCustomer = await Customer.create({
      customerID,
      customerName,
      customerEmail,
      customerAddress,
      customerPassword,
    });
    
    res.status(201).json(newCustomer); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating customer' });
  }
};

// Update a customer's details (PUT)
exports.updateCustomer = async (req, res) => {
  const { id } = req.params; 
  
  try {
    const customer = await Customer.findOne({ where: { customerID: id } });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Update customer details (partial update)
    const updatedCustomer = await customer.update(req.body);

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update customer' });
  }
};

// Delete a customer (DELETE)
exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;  
  
  try {
    const customer = await Customer.findOne({ where: { customerID: id } });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    await customer.destroy(); 

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};
