// models/flavor.js

const { DataTypes, Model } = require('sequelize');
const db = require('../config/database.js');

const Order = require('./order.js'); 
const Combo = require('./combo.js');

class Flavor extends Model{}

Flavor.init({
    flavorID: { 
        type: DataTypes.STRING(100), 
        primaryKey: true, 
        allowNull: false 
    },
    flavorName: { 
        type: DataTypes.STRING(100), 
        allowNull: false, 
        unique: true 
    }
}, { 
    sequelize: db,  
    modelName: 'Flavor',
});

// Associations
// One flavor can appear in many orders in one of three positions
Flavor.hasMany(Order, { foreignKey: 'flavor1ID', as: 'flavor1Orders' });
Flavor.hasMany(Order, { foreignKey: 'flavor2ID', as: 'flavor2Orders' });
Flavor.hasMany(Order, { foreignKey: 'flavor3ID', as: 'flavor3Orders' });

// One flavor can appear in many combos in one of three positions
Flavor.hasMany(Combo, { foreignKey: 'flavor1ID', as: 'flavor1Combos' });
Flavor.hasMany(Combo, { foreignKey: 'flavor2ID', as: 'flavor2Combos' });
Flavor.hasMany(Combo, { foreignKey: 'flavor3ID', as: 'flavor3Combos' });

module.exports = Flavor;
