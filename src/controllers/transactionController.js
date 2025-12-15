const { borrowBook, returnBook } = require('../services/transactionService');

async function borrow(req, res) {
  try {
    const { bookId, memberId } = req.body;

    const transaction = await borrowBook(bookId, memberId);

    res.status(201).json({
      message: 'Book borrowed successfully',
      transaction
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}

async function returnBookController(req, res) {
  try {
    const { id } = req.params;

    const transaction = await returnBook(id);

    res.status(200).json({
      message: 'Book returned successfully',
      transaction
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}

module.exports = {
  borrow,
  returnBookController
};
