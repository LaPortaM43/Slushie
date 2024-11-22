// controllers/comboController.js

import { getCombosCRUD, getComboByIDCRUD, createComboCRUD, updateComboCRUD, deleteComboCRUD } from '../database/combosCRUD.js';

// Get all combos (GET)
export async function getAllCombos(req, res) {
  try {
    const combos = await getCombosCRUD();
    res.status(200).json(combos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve combos' });
  }
}

// Get combo by ID (GET)
export async function getComboById(req, res) {
  try {
    const combo = await getComboByIDCRUD(req.params.id); // Using comboID here
    if (combo) {
      res.status(200).json(combo);
    } else {
      res.status(404).json({ error: 'Combo not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve combo' });
  }
}

// Create a new combo (POST)
export async function createCombo(req, res) {
  const { comboName, comboPrice, comboDescription } = req.body;

  if (!comboName || !comboPrice || !comboDescription) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newCombo = await createComboCRUD(comboName, comboPrice, comboDescription);
    res.status(201).json({
      comboID: newCombo.comboID,
      comboName: newCombo.comboName,
      comboPrice: newCombo.comboPrice,
      comboDescription: newCombo.comboDescription,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create combo' });
  }
}

// Update a combo's details (PUT)
export async function updateCombo(req, res) {
  const { id } = req.params;

  try {
    const updatedCombo = await updateComboCRUD(id, req.body.comboName, req.body.comboPrice, req.body.comboDescription);
    if (!updatedCombo) {
      return res.status(404).json({ error: 'Combo not found' });
    }
    res.status(200).json(updatedCombo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update combo' });
  }
}

// Delete a combo (DELETE)
export async function deleteCombo(req, res) {
  const { id } = req.params;

  try {
    const result = await deleteComboCRUD(id);
    if (result !== 'Combo deleted') {
      return res.status(404).json({ error: 'Combo not found' });
    }
    res.status(200).json({ message: 'Combo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete combo' });
  }
}
