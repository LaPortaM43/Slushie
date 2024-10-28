import { pool } from '../db.js';

// Create
export async function createOrder(orderID, customerID, restaurantID, price, deliveryAddress) { 
    try { 
        const [result] = await pool.query(`
            INSERT INTO orders (orderID, customerID, restaurantID, price, deliveryAddress)
            VALUES (?, ?, ?, ?, ?)`, [orderID, customerID, restaurantID, price, deliveryAddress]); 

        if (result.affectedRows == 0) { 
            throw new Error("Failed to create order");
        }
        return getOrder(orderID);
    } catch (error) { 
        console.error("Error creating order: ", error);
        throw error; 
    } 
}

// Read all 
export async function getOrders() { 
    try { 
        const [rows] = await pool.query("SELECT * FROM orders");
        return rows; 
    } catch(error) { 
        console.error("Error reading orders: ", error); 
        throw error; 
    }
}

// Read by ID 
export async function getOrder(orderID) { 
    try { 
        const [rows] = await pool.query(`
            SELECT * FROM orders WHERE orderID = ?`, [orderID]);

        if (rows.length == 0) { 
            throw new Error("Order not found");
        }
        return rows[0]; 
    } catch(error) { 
        console.error("Error reading order: ", error);
        throw error; 
    } 
}

// Update 
export async function updateOrder(orderID, customerID, restaurantID, price, deliveryAddress) {
    try { 
        const [result] = await pool.query(`
            UPDATE orders 
            SET customerID = ?, restaurantID = ?, price = ?, deliveryAddress = ?
            WHERE orderID = ?`, [customerID, restaurantID, price, deliveryAddress, orderID]); 

        if (result.affectedRows == 0) {
            throw new Error("Failed to update order or order not found");
        }
        return getOrder(orderID); // Return the updated order
    } catch (error) { 
        console.error("Error updating order: ", error); 
        throw error; 
    }
}

// Delete 
export async function deleteOrder(orderID) { 
    try { 
        const [result] = await pool.query(`
            DELETE FROM orders 
            WHERE orderID = ?`, [orderID]);

        if (result.affectedRows == 0) {
            throw new Error("Failed to delete order");
        }
        return "Order deleted";
    } catch (error) {
        console.error("Error deleting order: ", error); 
        throw error;
    }
}
