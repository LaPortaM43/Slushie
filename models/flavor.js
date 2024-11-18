// models/flavor.js

const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Order = require('./order'); 
const Combo = require('./combo');
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

})

Flavor.hasMany(Order, { foreignKey: 'flavor1ID', as: 'flavor1Orders' });
Flavor.hasMany(Order, { foreignKey: 'flavor2ID', as: 'flavor2Orders' });
Flavor.hasMany(Order, { foreignKey: 'flavor3ID', as: 'flavor3Orders' });

Flavor.hasMany(Combo, { foreignKey: 'flavor1ID', as: 'flavor1Combos' });
Flavor.hasMany(Combo, { foreignKey: 'flavor2ID', as: 'flavor2Combos' });
Flavor.hasMany(Combo, { foreignKey: 'flavor3ID', as: 'flavor3Combos' });

module.exports = Flavor;
