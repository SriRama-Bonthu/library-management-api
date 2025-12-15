const { Transaction, Fine } = require('../models');

async function checkBorrowLimit(memberId) {
  const activeBorrows = await Transaction.count({
    where: {
      member_id: memberId,
      status: 'active'
    }
  });

  if (activeBorrows >= 3) {
    throw new Error('Borrow limit exceeded (max 3 books allowed)');
  }
}

async function checkUnpaidFines(memberId) {
  const unpaidFines = await Fine.count({
    where: {
      member_id: memberId,
      paid_at: null
    }
  });

  if (unpaidFines > 0) {
    throw new Error('Member has unpaid fines');
  }
}

module.exports = {
  checkBorrowLimit,
  checkUnpaidFines
};
