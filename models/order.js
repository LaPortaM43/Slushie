// models/order.js

const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Order = db.define('Order', {
    orderID: { 
        type: DataTypes.STRING(100), 
        primaryKey: true, 
        allowNull: false 
    },
    customerID: { 
        type: DataTypes.STRING(100), 
        references: { model: 'customers', key: 'customerID' }, 
        allowNull: false 
    },
    price: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    deliveryAddress: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    branchID: { 
        type: DataTypes.STRING(100), 
        references: { model: 'branches', key: 'branchID' }, 
        allowNull: false 
    },
    flavor1ID: { 
        type: DataTypes.STRING(100), 
        references: { model: 'flavors', key: 'flavorID' },
        allowNull: false 
    },
    flavor2ID: { 
        type: DataTypes.STRING(100), 
        references: { model: 'flavors', key: 'flavorID' },
        allowNull: true 
    },
    flavor3ID: { 
        type: DataTypes.STRING(100), 
        references: { model: 'flavors', key: 'flavorID' },
        allowNull: true 
    }
});

module.exports = Order;
