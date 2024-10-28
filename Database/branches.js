// branches.js

import { pool } from '../db.js';

// Read all 
export async function getBranches() { 
    try { 
        const [rows] = await pool.query("SELECT * FROM branches");
        return rows; 
    } catch(error) { 
        console.error("Error reading branches: ", error); 
        throw error; 
    }
}

// Read by ID 
export async function getBranches(branchesID) { 
    try { 
        const [rows] = await pool.query(`
            SELECT * FROM branches WHERE branchID = ?`, [branchID]);

        if (rows.length == 0) { 
            throw new Error("Branch not found");
        }
        return rows[0]; 
    } catch(error) { 
        console.error("Error reading branches: ", error);
        throw error; 
    } 
}

