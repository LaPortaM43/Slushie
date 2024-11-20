// models/combo.js

const { DataTypes, Model } = require('sequelize');
const db = require('../config/database.js');

class Combo extends Model{} 
Combo.init({
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
    },
}, {
    sequelize: sequelize,  
    modelName: 'Combo',
})

module.exports = Combo;

