// controllers/orderController.js

import { getOrdersCRUD, getOrderByIDCRUD, createOrderCRUD, updateOrderCRUD, deleteOrderCRUD } from '../database/ordersCRUD.js';

// Get all orders (GET)
export async function getAllOrders(req, res) {
  try {
    const orders = await getOrdersCRUD();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
}

// Get order by ID (GET)
export async function getOrderById(req, res) {
  try {
    const order = await getOrderByIDCRUD(req.params.id); // Using orderID here
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve order' });
  }
}

// Create a new order (POST)
export async function createOrder(req, res) {
  const { customerID, comboID, flavorIDs, totalAmount } = req.body;

  if (!customerID || !comboID || !flavorIDs || !totalAmount) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newOrder = await createOrderCRUD(customerID, comboID, flavorIDs, totalAmount);
    res.status(201).json({
      orderID: newOrder.orderID,
      customerID: newOrder.customerID,
      comboID: newOrder.comboID,
      flavorIDs: newOrder.flavorIDs,
      totalAmount: newOrder.totalAmount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
}

// Update an order's details (PUT)
export async function updateOrder(req, res) {
  const { id } = req.params;

  try {
    const updatedOrder = await updateOrderCRUD(id, req.body.customerID, req.body.comboID, req.body.flavorIDs, req.body.totalAmount);
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update order' });
  }
}

// Delete an order (DELETE)
export async function deleteOrder(req, res) {
  const { id } = req.params;

  try {
    const result = await deleteOrderCRUD(id);
    if (result !== 'Order deleted') {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
}
