const { Transaction, Member } = require('../models');

async function checkAndSuspendMember(memberId) {
  const overdueCount = await Transaction.count({
    where: {
      member_id: memberId,
      status: 'overdue'
    }
  });

  if (overdueCount >= 3) {
    await Member.update(
      { status: 'suspended' },
      { where: { id: memberId } }
    );
  }
}

module.exports = {
  checkAndSuspendMember
};
