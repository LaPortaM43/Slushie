// models/combo.js

const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Combo = db.define('Combo', {
    comboID: { 
        type: DataTypes.STRING(100), 
        primaryKey: true, 
        allowNull: false 
    },
    customerID: { 
        type: DataTypes.STRING(100), 
        references: { model: 'customers', key: 'customerID' }, 
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

module.exports = Combo;
