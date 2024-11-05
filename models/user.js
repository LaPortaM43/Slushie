// models/user.js
const { DataTypes } = require('sequelize'); 
const db = require('../config/database');

const User = db.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});


module.exports = User;