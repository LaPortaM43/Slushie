// models/order.js

const { DataTypes, Model } = require('sequelize');
const db = require('../config/database.js');

const Customer = require('./customer.js');
const Flavor = require('./flavor.js'); 
const Branch = require('./branch.js');

class Order extends Model{}

Order.init({
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
    },
}, {
    sequelize: db,  
    modelName: 'Order',   
});

Order.belongsTo(Customer, { foreignKey: 'customerID' });
Order.belongsTo(Branch, { foreignKey: 'branchID' });
Order.belongsTo(Flavor, { foreignKey: 'flavor1ID', as: 'Flavor1' });
Order.belongsTo(Flavor, { foreignKey: 'flavor2ID', as: 'Flavor2' });
Order.belongsTo(Flavor, { foreignKey: 'flavor3ID', as: 'Flavor3' });

module.exports = Order;

