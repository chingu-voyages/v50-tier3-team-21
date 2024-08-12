const { stripe } = require("../config/lib/stripe");
const { v4: uuidv4 } = require('uuid');
const db = require("../models");
const { AccountCreditor } = require("../services/accounts/AccountCreditor");
const { AccountDebitor } = require("../services/accounts/AccountDebitor");

const handleStripeTopup = async (req, res) => {
  try {
    const { amount, successUrl, cancelUrl } = req.body;
    const userId = req.user.id;
    const customer = await stripe.customers.create({
      metadata: { userId: `${userId}` }
    });
    const sessionId = uuidv4();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Wallet Top-up',
            },
            unit_amount: amount * 100, 
          },
          quantity: 1,
        },
      ],
      customer: customer.id,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}${successUrl}?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}${cancelUrl}?success=false`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const handleStripeWebhook = async (req, res) => {
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
  let event = req.body;
  if (endpointSecret) {
    const signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }

 try {
  const data = event.data.object;
  const eventType = event.type;
  if (eventType === 'checkout.session.completed') {
    const customerId = data.customer;
    const paymentIntentId = data.payment_intent;
    const amount = data.amount_total;
    const status = data.payment_status;
    const customer = await stripe.customers.retrieve(data.customer);
    const userId = customer.metadata.userId;
    const account = await db.Account.findOne({ where: { userId } });
    await new AccountCreditor(amount, account).perform();
  } 
  res.send();
 } catch (error) {
  return res.status(400).json({
    status: "fail",
    message: error.message,
  });
 }
}

const makePayment = async(req, res) => {
  const { amount, orderId } = req.body;
  try {
    const userId = req.user.id;
    const account = await db.Account.findOne({ where: { userId } });
    await new AccountDebitor(amount, account, db).perform();

   return res.status(200).json({
    "status": "success",
    "message": "Payment successfull"
   });
  } catch(error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

 const getAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const account = await db.Account.findOne({ where: { userId } });

   return res.status(200).json(account);
  } catch(error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
 }

module.exports = {
  handleStripeTopup,
  handleStripeWebhook,
  getAccount,
  makePayment,
};
