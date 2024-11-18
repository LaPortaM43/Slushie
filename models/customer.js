// models/customer.js

const { DataTypes, model} = require('sequelize');
const db = require('../config/database');

const Order = require('./order');
const Flavor = require('./flavor'); 
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
    sequelize: db, 
    modelName: 'Customer', 
});

Customer.hasMany(Order, { foreignKey: 'customerID', as: 'orders' });
Order.belongsTo(Customer, { foreignKey: 'customerID', as: 'customer' });

module.exports = Customer;
