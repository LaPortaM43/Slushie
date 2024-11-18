// models/branch.js

const { DataTypes, model } = require('sequelize');
const db = require('../config/database');

class Branch extends model{} 
Branch.init({
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
    },
}, {
    sequelize: db, 
    modelName: 'Branch',
})

module.exports = Branch;
