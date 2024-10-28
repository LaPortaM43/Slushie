// flavors.js 

import { pool } from '../db.js';

export async function getFlavors() {
    try {
        const [rows] = await pool.query("SELECT * FROM flavors"); 
        return rows; 
    } catch(error) {
        console.error("Error retrieving flavors: ", error);
    }
}

