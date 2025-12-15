const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fine = sequelize.define('Fine', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  transaction_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },

  paid_at: {
    type: DataTypes.DATE,
    allowNull: true
  }

}, {
  tableName: 'fines',
  timestamps: true
});

module.exports = Fine;
