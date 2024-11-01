// combo.js 

import { pool } from '../db.js';

// Create
export async function createCombo(comboID, customerID, flavor1ID, flavor2ID, flavor3ID) { 
  try { 
      const [result] = await pool.query(`
          INSERT INTO combo (comboID, customerID, flavor1ID, flavor2ID, flavor3ID)
          VALUES (?, ?, ?, ?, ?)`, [comboID, customerID, flavor1ID, flavor2ID, flavor3ID]); 

      if (result.affectedRows == 0) { 
          throw new Error("Failed to create combo");
      }
      return getComboByID(comboID, customerID);
  } catch (error) { 
      console.error("Error creating combo: ", error);
      throw error; 
  } 
}

// Read all 
export async function getCombo() { 
  try { 
      const [rows] = await pool.query("SELECT * FROM combo");
      return rows; 
  } catch(error) { 
      console.error("Error reading combo: ", error); 
      throw error; 
  }
}

// Read by ID 
export async function getComboByID(comboID, customerID) { 
  try { 
      const [rows] = await pool.query(`
          SELECT * FROM combo WHERE comboID = ? AND customerID = ?`, 
          [comboID, customerID]); 

      if (rows.length == 0) { 
          throw new Error("Combo not found for that customer");
      }
      return rows[0]; 
  } catch(error) { 
      console.error("Error reading combo: ", error);
      throw error; 
  } 
}

// Update 
// I don't think we are able to update entries in combo since it's all foreign keys 
/*
export async function updateCombo(comboID, customerID, flavor1ID, flavor2ID, flavor3ID) {
  try { 
      const [result] = await pool.query(`
          UPDATE combo
          SET customerID = ?, flavor1ID = ?, flavor2ID = ?, flavor3ID = ?
          WHERE comboID = ?`, [customerID, flavor1ID, flavor2ID, flavor3ID, comboID]); 

      if (result.affectedRows == 0) {
          throw new Error("Failed to update combo");
      }
      return getComboByID(comboID, customerID);
  } catch (error) { 
      console.error("Error updating combo: ", error); 
      throw error; 
  }
}
*/ 

// Delete 
export async function deleteCombo(comboID, customerID) { 
  try { 
      const [result] = await pool.query(`
          DELETE FROM combo
          WHERE comboID = ? AND customerID = ?`, [comboID, customerID]);

      if (result.affectedRows == 0) {
          throw new Error("Failed to delete combo");
      }
      return "Combo deleted"; 
  } catch (error) {
      console.error("Error deleting combo: ", error); 
      throw error;
  }
}

/*
// Testing functions 
// customerID could be default null 
try { 

    // In MySQL, you need to specify if NULL, in node.js, just leave the field blank 
    // After looking into it more, you actualy can use null. It just has to be lowercase in javascript 
    console.log("Creating combo: " ); 
    const createdCombo = await createCombo('cb6', 'c1', 'flav1');
    console.log(createdCombo); 
    
    console.log("Reading combos: "); 
    const readCombos = await getCombo(); 
    console.log(readCombos);

    console.log("Reading combo by ID (cb2): "); 
    const readComboByID = await getComboByID('cb2','c2');
    console.log(readComboByID);
    
    console.log("Deleting combo: ");
    const deletedCombo = await deleteCombo('cb6', 'c1');
    console.log(deletedCombo);
    
} catch (error) { 
    console.error("Error testing functions: ", error) 
    throw error; 
}
*/






