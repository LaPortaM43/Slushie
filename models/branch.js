// models/branch.js

const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Branch = db.define('Branch', {
    branchID: { 
        type: DataTypes.STRING(100), 
        primaryKey: true, 
        allowNull: false 
    },
    branchName: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    branchAddress: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    }
});

module.exports = Branch;
