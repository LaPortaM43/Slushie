// models/branch.js

const { DataTypes, Model } = require('sequelize');
const db = require('../config/database.js');

class Branch extends Model{} 
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
