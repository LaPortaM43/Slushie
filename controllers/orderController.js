// controllers/orderController.js

const { Order, Customer, Branch, Flavor } = require('../models/order.js');

// Get all orders (GET)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: Customer, attributes: ['customerName', 'customerEmail'] },
        { model: Branch, attributes: ['branchName', 'branchAddress'] },
        { model: Flavor, as: 'Flavor1', attributes: ['flavorName'] },
        { model: Flavor, as: 'Flavor2', attributes: ['flavorName'] },
        { model: Flavor, as: 'Flavor3', attributes: ['flavorName'] }
      ]
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
};

// Get order by ID (GET)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: Customer, attributes: ['customerName', 'customerEmail'] },
        { model: Branch, attributes: ['branchName', 'branchAddress'] },
        { model: Flavor, as: 'Flavor1', attributes: ['flavorName'] },
        { model: Flavor, as: 'Flavor2', attributes: ['flavorName'] },
        { model: Flavor, as: 'Flavor3', attributes: ['flavorName'] }
      ]
    });

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve order' });
  }
};

// Create a new order (POST)
exports.createOrder = async (req, res) => {
  try {
    const { customerID, price, deliveryAddress, branchID, flavor1ID, flavor2ID, flavor3ID } = req.body;

    if (!customerID || !price || !branchID || !flavor1ID) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newOrder = await Order.create({
      customerID,
      price,
      deliveryAddress,
      branchID,
      flavor1ID,
      flavor2ID,
      flavor3ID
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating order' });
  }
};

// Update an existing order (PUT)
exports.updateOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({ where: { orderID: id } });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const updatedOrder = await order.update(req.body);

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// Delete an order (DELETE)
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({ where: { orderID: id } });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.destroy(); 
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
