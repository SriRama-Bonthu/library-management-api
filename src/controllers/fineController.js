const { Fine } = require('../models');

async function payFine(req, res) {
  try {
    const { id } = req.params;

    const fine = await Fine.findByPk(id);
    if (!fine) {
      return res.status(404).json({ error: 'Fine not found' });
    }

    fine.paid_at = new Date();
    await fine.save();

    res.status(200).json({
      message: 'Fine paid successfully',
      fine
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  payFine
};
