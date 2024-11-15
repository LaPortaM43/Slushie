// models/customer.js

const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Customer = db.define('Customer', {
    customerID: { 
        type: DataTypes.STRING(100), 
        primaryKey: true, 
        allowNull: false 
    },
    customerName: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    customerEmail: { 
        type: DataTypes.STRING(100), 
        allowNull: false, 
        unique: true 
    },
    customerAddress: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    customerPassword: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }
});

module.exports = Customer;
