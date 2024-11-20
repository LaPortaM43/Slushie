// models/customer.js

const { DataTypes, Model} = require('sequelize');
const db = require('../config/database.js');

const Order = require('./order.js');
const Flavor = require('./flavor.js'); 
class Customer extends Model {}

Customer.init({

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
    },

}, { 
    sequelize: sequelize, 
    modelName: 'Customer', 
});

Customer.hasMany(Order, { foreignKey: 'customerID', as: 'orders' });
Order.belongsTo(Customer, { foreignKey: 'customerID', as: 'customer' });

module.exports = Customer;
