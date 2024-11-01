// orders.js

import { pool } from '../db.js';

// Create
export async function createOrder(orderID, customerID, branchID, price, deliveryAddress, flavor1ID, flavor2ID, flavor3ID) { 
    try { 
        const [result] = await pool.query(`
            INSERT INTO orders (orderID, customerID, price, deliveryAddress, branchID, flavor1ID, flavor2ID, flavor3ID) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [orderID, customerID, price, deliveryAddress, branchID, flavor1ID, flavor2ID, flavor3ID]); 

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
export async function updateOrder(orderID, customerID, branchID, price, deliveryAddress, flavor1ID, flavor2ID, flavor3ID) {
    try { 
        const [result] = await pool.query(`
            UPDATE orders 
            SET customerID = ?, branchID = ?, price = ?, deliveryAddress = ?, flavor1ID = ?, flavor2ID = ?, flavor3ID = ? 
            WHERE orderID = ?`, 
            [customerID, branchID, price, deliveryAddress, flavor1ID, flavor2ID, flavor3ID, orderID]); 

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

// Testing functions 
try { 
    console.log("Creating an order: ");
    const createdOrder = await createOrder('o2', 'c2', 'b1', 10.99, null, 'flav1', 'flav2', null);
    console.log(createdOrder); 

    console.log("Reading orders: "); 
    const readOrders = await getOrders(); 
    console.log(readOrders);

    console.log("Reading order by ID (o2): ");
    const readOrderByID = await getOrder('o2');
    console.log(readOrderByID);

    console.log("Updating order (o2): ");
    const updatedOrder = await updateOrder('o2', 'c2', 'b1', 12.99, '456 Elm St', 'flav1', 'flav2', 'flav3'); 
    console.log(updatedOrder);
    
    console.log("Deleting order (o2): "); 
    const deletedOrder = await deleteOrder('o2');
    console.log(deletedOrder);

} catch(error) { 
    console.error("Error testing functions: ", error); 
    throw error; 
}


