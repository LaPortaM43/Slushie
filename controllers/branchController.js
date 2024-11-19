// controllers/branch.js

const { Branch } = require('../models');

// Get all branches (GET)
exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll();
    res.status(200).json(branches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve branches' });
  }
};

// Get branch by ID (GET)
exports.getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (branch) {
      res.status(200).json(branch);
    } else {
      res.status(404).json({ error: 'Branch not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve branch' });
  }
};

// Create a new branch (POST)
exports.createBranch = async (req, res) => {
  try {
    const { branchID, branchName, branchAddress } = req.body;

    if (!branchID || !branchName || !branchAddress) {
      return res.status(400).json({ error: 'All fields are required (branchID, branchName, branchAddress)' });
    }

    // Create the new branch
    const newBranch = await Branch.create({
      branchID,
      branchName,
      branchAddress,
    });

    res.status(201).json(newBranch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating branch' });
  }
};

// Update an existing branch (PUT)
exports.updateBranch = async (req, res) => {
  const { id } = req.params;

  try {
    const branch = await Branch.findOne({ where: { branchID: id } });

    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    // Update the branch with new data
    const updatedBranch = await branch.update(req.body);
    res.status(200).json(updatedBranch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update branch' });
  }
};

// Delete a branch (DELETE)
exports.deleteBranch = async (req, res) => {
  const { id } = req.params;

  try {
    const branch = await Branch.findOne({ where: { branchID: id } });

    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    // Delete the branch
    await branch.destroy();
    res.status(200).json({ message: 'Branch deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete branch' });
  }
};
