const dayjs = require('dayjs');
const { Book, Member, Transaction, Fine } = require('../models');
const { calculateDueDate, calculateOverdueDays } = require('../utils/dateUtils');
const { checkBorrowLimit, checkUnpaidFines } = require('./businessRules');

async function borrowBook(bookId, memberId) {
  const book = await Book.findByPk(bookId);
  if (!book || book.status !== 'available' || book.available_copies < 1) {
    throw new Error('Book is not available for borrowing');
  }

  const member = await Member.findByPk(memberId);
  if (!member || member.status !== 'active') {
    throw new Error('Member is not allowed to borrow books');
  }

  await checkBorrowLimit(memberId);
  await checkUnpaidFines(memberId);

  const borrowedAt = new Date();
  const dueDate = calculateDueDate(borrowedAt);

  const transaction = await Transaction.create({
    book_id: bookId,
    member_id: memberId,
    borrowed_at: borrowedAt,
    due_date: dueDate
  });

  book.available_copies -= 1;
  if (book.available_copies === 0) {
    book.status = 'borrowed';
  }
  await book.save();

  return transaction;
}

async function returnBook(transactionId) {
  const transaction = await Transaction.findByPk(transactionId);
  if (!transaction || transaction.status === 'returned') {
    throw new Error('Invalid transaction');
  }

  const book = await Book.findByPk(transaction.book_id);

  const overdueDays = calculateOverdueDays(transaction.due_date);

  if (overdueDays > 0) {
    const fineAmount = overdueDays * 0.5;

    await Fine.create({
      member_id: transaction.member_id,
      transaction_id: transaction.id,
      amount: fineAmount
    });

    transaction.status = 'overdue';
  }

  transaction.returned_at = new Date();
  transaction.status = 'returned';
  await transaction.save();

  book.available_copies += 1;
  book.status = 'available';
  await book.save();

  return transaction;
}

module.exports = {
  borrowBook,
  returnBook
};
