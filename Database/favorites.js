// favorites.js 

import { pool } from '../db.js';

// Create
export async function createFavorite(favoriteID, customerID, flavor1ID, flavor2ID, flavor3ID) { 
  try { 
      const [result] = await pool.query(`
          INSERT INTO favorites (favoriteID, customerID, flavor1ID, flavor2ID, flavor3ID)
          VALUES (?, ?, ?, ?, ?)`, [favoriteID, customerID, flavor1ID, flavor2ID, flavor3ID]); 

      if (result.affectedRows == 0) { 
          throw new Error("Failed to create favorite");
      }
      return getFavorite(favoriteID, customerID);
  } catch (error) { 
      console.error("Error creating favorite: ", error);
      throw error; 
  } 
}

// Read all 
export async function getFavorites() { 
  try { 
      const [rows] = await pool.query("SELECT * FROM favorites");
      return rows; 
  } catch(error) { 
      console.error("Error reading favorites: ", error); 
      throw error; 
  }
}

// Read by ID 
export async function getFavorite(favoriteID, customerID) { 
  try { 
      const [rows] = await pool.query(`
          SELECT * FROM favorites WHERE favoriteID = ? AND customerID = ?`, 
          [favoriteID, customerID]); 

      if (rows.length == 0) { 
          throw new Error("Favorite not found for that customer");
      }
      return rows[0]; 
  } catch(error) { 
      console.error("Error reading favorite: ", error);
      throw error; 
  } 
}

// Update 
export async function updateFavorite(favoriteID, customerID, flavor1ID, flavor2ID, flavor3ID) {
  try { 
      const [result] = await pool.query(`
          UPDATE favorites 
          SET customerID = ?, flavor1ID = ?, flavor2ID = ?, flavor3ID = ?
          WHERE favoriteID = ?`, [customerID, flavor1ID, flavor2ID, flavor3ID, favoriteID]); 

      if (result.affectedRows == 0) {
          throw new Error("Failed to update favorite");
      }
      return getFavorite(favoriteID, customerID);
  } catch (error) { 
      console.error("Error updating favorite: ", error); 
      throw error; 
  }
}

// Delete 
export async function deleteFavorite(favoriteID, customerID) { 
  try { 
      const [result] = await pool.query(`
          DELETE FROM favorites 
          WHERE favoriteID = ? AND customerID = ?`, [favoriteID, customerID]);

      if (result.affectedRows == 0) {
          throw new Error("Failed to delete favorite");
      }
      return "Favorite deleted"; 
  } catch (error) {
      console.error("Error deleting favorite: ", error); 
      throw error;
  }
}




