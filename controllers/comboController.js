// controllers/combo.js

const { Combo } = require('../models/combo.js');
const { Customer } = require('../models/customer.js');
const { Flavor} = require('../models/flavor.js');

// Get all combos (GET)
exports.getAllCombos = async (req, res) => {
  try {
    const combos = await Combo.findAll({
      include: [
        { model: Customer, as: 'customer', attributes: ['customerName', 'customerEmail'] },
        { model: Flavor, as: 'flavor1', attributes: ['flavorName'] },
        { model: Flavor, as: 'flavor2', attributes: ['flavorName'] },
        { model: Flavor, as: 'flavor3', attributes: ['flavorName'] }
      ]
    });
    res.status(200).json(combos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve combos' });
  }
};

// Get combo by ID (GET)
exports.getComboById = async (req, res) => {
  try {
    const combo = await Combo.findByPk(req.params.id, {
      include: [
        { model: Customer, as: 'customer', attributes: ['customerName', 'customerEmail'] },
        { model: Flavor, as: 'flavor1', attributes: ['flavorName'] },
        { model: Flavor, as: 'flavor2', attributes: ['flavorName'] },
        { model: Flavor, as: 'flavor3', attributes: ['flavorName'] }
      ]
    });

    if (combo) {
      res.status(200).json(combo);
    } else {
      res.status(404).json({ error: 'Combo not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve combo' });
  }
};

// Create a new combo (POST)
exports.createCombo = async (req, res) => {
  try {
    const { customerID, flavor1ID, flavor2ID, flavor3ID } = req.body;

    if (!customerID || !flavor1ID) {
      return res.status(400).json({ error: 'Customer ID and at least one flavor are required' });
    }

    
    const customer = await Customer.findByPk(customerID);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Create the new combo
    const newCombo = await Combo.create({
      customerID,
      flavor1ID,
      flavor2ID: flavor2ID || null,
      flavor3ID: flavor3ID || null  
    });

    res.status(201).json(newCombo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating combo' });
  }
};

// Update an existing combo (PUT)
exports.updateCombo = async (req, res) => {
  const { id } = req.params;

  try {
    const combo = await Combo.findOne({ where: { comboID: id } });

    if (!combo) {
      return res.status(404).json({ error: 'Combo not found' });
    }

    // Update the combo with new data
    const updatedCombo = await combo.update(req.body);
    res.status(200).json(updatedCombo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update combo' });
  }
};

// Delete a combo (DELETE)
exports.deleteCombo = async (req, res) => {
  const { id } = req.params;

  try {
    const combo = await Combo.findOne({ where: { comboID: id } });

    if (!combo) {
      return res.status(404).json({ error: 'Combo not found' });
    }

    // Delete the combo
    await combo.destroy();
    res.status(200).json({ message: 'Combo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete combo' });
  }
};
