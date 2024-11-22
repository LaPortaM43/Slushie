// controllers/branchController.js

import { getBranchesCRUD, getBranchByIDCRUD, createBranchCRUD, updateBranchCRUD, deleteBranchCRUD } from '../database/branchesCRUD.js';

// Get all branches (GET)
export async function getAllBranches(req, res) {
  try {
    const branches = await getBranchesCRUD();
    res.status(200).json(branches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve branches' });
  }
}

// Get branch by ID (GET)
export async function getBranchById(req, res) {
  try {
    const branch = await getBranchByIDCRUD(req.params.id); // Using branchID here
    if (branch) {
      res.status(200).json(branch);
    } else {
      res.status(404).json({ error: 'Branch not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve branch' });
  }
}

// Create a new branch (POST)
export async function createBranch(req, res) {
  const { branchName, branchLocation } = req.body;

  if (!branchName || !branchLocation) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newBranch = await createBranchCRUD(branchName, branchLocation);
    res.status(201).json({
      branchID: newBranch.branchID,
      branchName: newBranch.branchName,
      branchLocation: newBranch.branchLocation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create branch' });
  }
}

// Update a branch's details (PUT)
export async function updateBranch(req, res) {
  const { id } = req.params;

  try {
    const updatedBranch = await updateBranchCRUD(id, req.body.branchName, req.body.branchLocation);
    if (!updatedBranch) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.status(200).json(updatedBranch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update branch' });
  }
}

// Delete a branch (DELETE)
export async function deleteBranch(req, res) {
  const { id } = req.params;

  try {
    const result = await deleteBranchCRUD(id);
    if (result !== 'Branch deleted') {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.status(200).json({ message: 'Branch deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete branch' });
  }
}
