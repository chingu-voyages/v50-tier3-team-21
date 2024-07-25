const express = require('express');
const bodyParser = require('body-parser');
const { createStripeCheckout, handleStripeWebhook  } = require('../controllers/walletController');
const router = express.Router();

router.post('/createCheckoutSession', createStripeCheckout);
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), handleStripeWebhook)

module.exports = router;