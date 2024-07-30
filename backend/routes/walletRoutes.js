const express = require('express');
const { handleStripeTopup, getAccount, makePayment } = require('../controllers/walletController');
const { protect } = require('../middlewares/authorization');
const router = express.Router();

router.post('/requestAccountTopup', protect, handleStripeTopup);
router.get('/', protect, getAccount);
router.post('/makePayment', protect, makePayment);

module.exports = router;