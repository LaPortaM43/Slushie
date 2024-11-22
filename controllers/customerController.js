// controllers/customerController.js

import { getCustomersCRUD, getCustomerByIDCRUD, createCustomerCRUD, updateCustomerCRUD, deleteCustomerCRUD } from '../database/customersCRUD.js';

// Get all customers (GET)
export async function getAllCustomers(req, res) {
  try {
    const customers = await getCustomersCRUD();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve customers' });
  }
}

// Get customer by ID (GET)
export async function getCustomerById(req, res) {
  try {
    const customer = await getCustomerByIDCRUD(req.params.id); // Using customerID here
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve customer' });
  }
}

// Create a new customer (POST)
export async function createCustomer(req, res) {
  const { customerName, customerEmail, customerAddress, customerPassword } = req.body;

  if (!customerName || !customerEmail || !customerAddress || !customerPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newCustomer = await createCustomerCRUD(customerName, customerEmail, customerAddress, customerPassword);
    res.status(201).json({
      customerID: newCustomer.customerID,
      customerName: newCustomer.customerName,
      customerEmail: newCustomer.customerEmail,
      customerAddress: newCustomer.customerAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
}

// Update a customer's details (PUT)
export async function updateCustomer(req, res) {
  const { id } = req.params;

  try {
    const updatedCustomer = await updateCustomerCRUD(id, req.body.customerName, req.body.customerEmail, req.body.customerAddress, req.body.customerPassword);
    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update customer' });
  }
}

// Delete a customer (DELETE)
export async function deleteCustomer(req, res) {
  const { id } = req.params;

  try {
    const result = await deleteCustomerCRUD(id);
    if (result !== 'Customer deleted') {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
}
