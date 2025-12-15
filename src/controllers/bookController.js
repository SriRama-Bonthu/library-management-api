const { Book } = require('../models');

async function createBook(req, res) {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
  console.error(error);  

  res.status(400).json({
    message: 'Book creation failed',
    error: error.errors ? error.errors.map(e => e.message) : error.message
  });
}
}

async function getAllBooks(req, res) {
  const books = await Book.findAll();
  res.json(books);
}

async function getBookById(req, res) {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
}

async function updateBook(req, res) {
  await Book.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Book updated' });
}

async function deleteBook(req, res) {
  await Book.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Book deleted' });
}

async function getAvailableBooks(req, res) {
  const books = await Book.findAll({
    where: { status: 'available' }
  });
  res.json(books);
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getAvailableBooks
};
