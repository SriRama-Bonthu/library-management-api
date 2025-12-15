const sequelize = require('../config/database');

const Book = require('./Book');
const Member = require('./Member');
const Transaction = require('./Transaction');
const Fine = require('./Fine');

/* Associations */
Book.hasMany(Transaction, { foreignKey: 'book_id' });
Transaction.belongsTo(Book, { foreignKey: 'book_id' });

Member.hasMany(Transaction, { foreignKey: 'member_id' });
Transaction.belongsTo(Member, { foreignKey: 'member_id' });

Member.hasMany(Fine, { foreignKey: 'member_id' });
Fine.belongsTo(Member, { foreignKey: 'member_id' });

Transaction.hasOne(Fine, { foreignKey: 'transaction_id' });
Fine.belongsTo(Transaction, { foreignKey: 'transaction_id' });

module.exports = {
  sequelize,
  Book,
  Member,
  Transaction,
  Fine
};
