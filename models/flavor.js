// models/flavor.js

const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Flavor = db.define('Flavor', {
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
});

module.exports = Flavor;
