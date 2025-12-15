const { Member, Transaction, Book } = require('../models');

async function createMember(req, res) {
  const member = await Member.create(req.body);
  res.status(201).json(member);
}

async function getMembers(req, res) {
  const members = await Member.findAll();
  res.json(members);
}

async function getMemberById(req, res) {
  const member = await Member.findByPk(req.params.id);
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.json(member);
}

async function updateMember(req, res) {
  await Member.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Member updated' });
}

async function deleteMember(req, res) {
  await Member.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Member deleted' });
}

async function getBorrowedBooks(req, res) {
  const transactions = await Transaction.findAll({
    where: {
      member_id: req.params.id,
      status: 'active'
    },
    include: Book
  });

  res.json(transactions);
}

module.exports = {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
  getBorrowedBooks
};
