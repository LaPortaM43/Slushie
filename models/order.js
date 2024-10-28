// models/order.js
const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Order = db.define('Order', {
    drinkName: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
});


module.exports = Order;
