const {DataTypes} = require('sequelize');
const {db} = require('../database/config');

//Definimos el modelo de la tabla Reparaciones

const Repair = db.define('repair', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'in process', 'finished', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  motorsNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

module.exports = {Repair};