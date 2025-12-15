const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionController');

router.post('/borrow', controller.borrow);
router.post('/:id/return', controller.returnBookController);

module.exports = router;
