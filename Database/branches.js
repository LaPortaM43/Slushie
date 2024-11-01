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
export async function getBranch(branchID) { 
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

// Testing functions 
/*
try { 

    console.log("Reading branches: "); 
    const readBranches = await getBranches(); 
    console.log(readBranches); 

    
    console.log("Reading branches by ID (b2): ")
    const readBranchByID = await getBranch('b2'); 
    console.log(readBranchByID);

} catch (error) { 
    console.error("Error testing functions: ", error); 
    throw error; 
}
*/

