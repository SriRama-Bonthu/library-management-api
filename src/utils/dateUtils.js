const dayjs = require('dayjs');

function calculateDueDate(borrowedAt) {
  return dayjs(borrowedAt).add(14, 'day').toDate();
}

function calculateOverdueDays(dueDate) {
  const today = dayjs();
  const due = dayjs(dueDate);

  if (today.isAfter(due)) {
    return today.diff(due, 'day');
  }
  return 0;
}

module.exports = {
  calculateDueDate,
  calculateOverdueDays
};
