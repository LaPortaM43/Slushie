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
      return getCombo(comboID, customerID);
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
export async function updateCombo(comboID, customerID, flavor1ID, flavor2ID, flavor3ID) {
  try { 
      const [result] = await pool.query(`
          UPDATE combo 
          SET customerID = ?, flavor1ID = ?, flavor2ID = ?, flavor3ID = ?
          WHERE comboID = ?`, [customerID, flavor1ID, flavor2ID, flavor3ID, favoriteID]); 

      if (result.affectedRows == 0) {
          throw new Error("Failed to update combo");
      }
      return getComboByID(comboID, customerID);
  } catch (error) { 
      console.error("Error updating combo: ", error); 
      throw error; 
  }
}

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

// testing functions 
/*
try { 
    console.log("Reading favorites: "); 
    const readFavorites = await createFavorites('f6', 'c1', '')


} catch (error) { 
    console.error("Error testing functions: ", error) 
    throw error; 
}
*/






