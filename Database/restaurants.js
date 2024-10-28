import { pool } from '../db.js';

// Read all 
export async function getRestaurants() { 
    try { 
        const [rows] = await pool.query("SELECT * FROM restaurants");
        return rows; 
    } catch(error) { 
        console.error("Error reading restaurants: ", error); 
        throw error; 
    }
}

// Read by ID 
export async function getRestaurant(restaurantID) { 
    try { 
        const [rows] = await pool.query(`
            SELECT * FROM restaurants WHERE restaurantID = ?`, [restaurantID]);

        if (rows.length == 0) { 
            throw new Error("Restaurant not found");
        }
        return rows[0]; 
    } catch(error) { 
        console.error("Error reading restaurant: ", error);
        throw error; 
    } 
}
