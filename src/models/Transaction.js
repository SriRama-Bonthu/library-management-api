const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  borrowed_at: {
    type: DataTypes.DATE,
    allowNull: false
  },

  due_date: {
    type: DataTypes.DATE,
    allowNull: false
  },

  returned_at: {
    type: DataTypes.DATE,
    allowNull: true
  },

  status: {
    type: DataTypes.ENUM('active', 'returned', 'overdue'),
    defaultValue: 'active'
  }

}, {
  tableName: 'transactions',
  timestamps: true
});

module.exports = Transaction;
