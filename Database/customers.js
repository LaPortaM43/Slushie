// customers.js 

import { pool } from '../db.js';

// Create 
export async function createCustomer(customerID, customerName, customerEmail, customerAddress, customerPassword) {
  try {
    // Using ? ? ? ? as placeholders is apparently good for security to prevent sql injection. 
    const [result] = await pool.query(`
      INSERT INTO customers (customerID, customerName, customerEmail, customerAddress, customerPassword)
      VALUES (?, ?, ?, ?, ?)`, [customerID, customerName, customerEmail, customerAddress, customerPassword]);
      
    // affectedRows is a property that MySQL provides after executing a query that modifies the database.
    if (result.affectedRows == 0) {
      throw new Error("Failed to create customer");
    }
    return getCustomer(customerID);
  } catch (error) {
      console.error("Error creating customer: ", error);
      throw error;
  }
}

// Read all 
export async function getCustomers() {
  try {
    const [rows] = await pool.query("SELECT * FROM customers");
    return rows;
  } catch (error) {
      console.error("Error retrieving customers: ", error);
      throw error; // Signal something went wrong and allow a different file to handle it. 
  }
}

// Read by ID 
export async function getCustomer(customerID) {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM customers WHERE customerID = ?`, [customerID]);

    // Checks if the customer exists, if not, creates a new error that the catch block will handle 
    if (rows.length == 0) {
      throw new Error("Customer not found");
    }
    return rows[0];
  } catch (error) {
      console.error("Error getting customer: ", error);
      throw error;
  }
}

// Update 
export async function updateCustomer(customerID, customerName, customerEmail, customerAddress, customerPassword) {
  try {
    const [result] = await pool.query(`
      UPDATE customers 
      SET customerName = ?, customerEmail = ?, customerAddress = ?, customerPassword = ?
      WHERE customerID = ?`, [customerName, customerEmail, customerAddress, customerPassword, customerID]);

    if (result.affectedRows == 0) {
      throw new Error("Failed to update customer");
    }
    return getCustomer(customerID);
  } catch (error) {
      console.error("Error updating customer: ", error);
      throw error;
  }
}

// Delete 
export async function deleteCustomer(customerID) {
  try {
    const [result] = await pool.query(`
      DELETE FROM customers 
      WHERE customerID = ?`, [customerID]);

    if (result.affectedRows == 0) {
      throw new Error("Failed to delete customer");
    }
    return "Customer deleted";
  } catch (error) {
      console.error("Error deleting customer: ", error);
      throw error;
  }
}


// Testing functions
/*
try {
    console.log("Creating a new customer: ");
    const newCustomer = await createCustomer('c6', 'Max', 'max@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'max123');
    console.log(newCustomer);

    console.log("Reading all customers: ");
    const readCustomers = await getCustomers();
    console.log(readCustomers);

    console.log("Reading a specific customer (c6): ");
    const readOneCustomer = await getCustomer("c6");
    console.log(readOneCustomer);

    console.log("Updating a customer (c6): ");
    const updatedCustomer = await updateCustomer('c6', 'jax', 'jax@gmail.com', '400 Cedar Ave, West Long Branch, NJ 07764', 'jax123');
    console.log(updatedCustomer);
} catch (error) {
    console.error("Error while testing functions: ", error);
    throw error;
}
*/
  
  
  
