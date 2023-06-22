const {DataTypes} = require('sequelize');
const {db} = require('../database/config');

//Definimos el modelo de la tabla Usuarios
const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,

  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user',
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = {User};