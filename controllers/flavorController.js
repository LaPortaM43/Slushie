// controllers/flavorController.js

const { Flavor, Order, Combo } = require('../models/flavor.js');

// Get all flavors (GET)
exports.getAllFlavors = async (req, res) => {
  try {
    const flavors = await Flavor.findAll();
    res.status(200).json(flavors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve flavors' });
  }
};

// Get flavor by ID (GET)
exports.getFlavorById = async (req, res) => {
  try {
    const flavor = await Flavor.findByPk(req.params.id, {
      include: [
        { model: Order, as: 'flavor1Orders', attributes: ['orderID'] },
        { model: Order, as: 'flavor2Orders', attributes: ['orderID'] },
        { model: Order, as: 'flavor3Orders', attributes: ['orderID'] },
        { model: Combo, as: 'flavor1Combos', attributes: ['comboID'] },
        { model: Combo, as: 'flavor2Combos', attributes: ['comboID'] },
        { model: Combo, as: 'flavor3Combos', attributes: ['comboID'] }
      ]
    });

    if (flavor) {
      res.status(200).json(flavor);
    } else {
      res.status(404).json({ error: 'Flavor not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve flavor' });
  }
};

// Create a new flavor (POST)
exports.createFlavor = async (req, res) => {
  try {
    const { flavorName } = req.body;

    if (!flavorName) {
      return res.status(400).json({ error: 'Flavor name is required' });
    }

    const newFlavor = await Flavor.create({ flavorName });
    res.status(201).json(newFlavor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating flavor' });
  }
};

// Update an existing flavor (PUT)
exports.updateFlavor = async (req, res) => {
  const { id } = req.params;

  try {
    const flavor = await Flavor.findOne({ where: { flavorID: id } });

    if (!flavor) {
      return res.status(404).json({ error: 'Flavor not found' });
    }

    const updatedFlavor = await flavor.update(req.body);
    res.status(200).json(updatedFlavor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update flavor' });
  }
};

// Delete a flavor (DELETE)
exports.deleteFlavor = async (req, res) => {
  const { id } = req.params;

  try {
    const flavor = await Flavor.findOne({ where: { flavorID: id } });

    if (!flavor) {
      return res.status(404).json({ error: 'Flavor not found' });
    }

    await flavor.destroy();
    res.status(200).json({ message: 'Flavor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete flavor' });
  }
};
