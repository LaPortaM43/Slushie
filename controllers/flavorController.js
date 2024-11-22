// controllers/flavorController.js

import { getFlavorsCRUD, getFlavorByIDCRUD, createFlavorCRUD, updateFlavorCRUD, deleteFlavorCRUD } from '../database/flavorsCRUD.js';

// Get all flavors (GET)
export async function getAllFlavors(req, res) {
  try {
    const flavors = await getFlavorsCRUD();
    res.status(200).json(flavors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve flavors' });
  }
}

// Get flavor by ID (GET)
export async function getFlavorById(req, res) {
  try {
    const flavor = await getFlavorByIDCRUD(req.params.id); // Using flavorID here
    if (flavor) {
      res.status(200).json(flavor);
    } else {
      res.status(404).json({ error: 'Flavor not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve flavor' });
  }
}

// Create a new flavor (POST)
export async function createFlavor(req, res) {
  const { flavorName, flavorDescription } = req.body;

  if (!flavorName || !flavorDescription) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newFlavor = await createFlavorCRUD(flavorName, flavorDescription);
    res.status(201).json({
      flavorID: newFlavor.flavorID,
      flavorName: newFlavor.flavorName,
      flavorDescription: newFlavor.flavorDescription,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create flavor' });
  }
}

// Update a flavor's details (PUT)
export async function updateFlavor(req, res) {
  const { id } = req.params;

  try {
    const updatedFlavor = await updateFlavorCRUD(id, req.body.flavorName, req.body.flavorDescription);
    if (!updatedFlavor) {
      return res.status(404).json({ error: 'Flavor not found' });
    }
    res.status(200).json(updatedFlavor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update flavor' });
  }
}

// Delete a flavor (DELETE)
export async function deleteFlavor(req, res) {
  const { id } = req.params;

  try {
    const result = await deleteFlavorCRUD(id);
    if (result !== 'Flavor deleted') {
      return res.status(404).json({ error: 'Flavor not found' });
    }
    res.status(200).json({ message: 'Flavor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete flavor' });
  }
}
