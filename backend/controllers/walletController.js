const { stripe } = require("../config/lib/stripe");
const { v4: uuidv4 } = require('uuid');
const db = require("../models");
const { AccountCreditor } = require("../services/accounts/AccountCreditor");
const { AccountDebitor } = require("../services/accounts/AccountDebitor");


const handleStripeTopup = async (req, res) => {
  const { amount, successUrl, cancelUrl } = req.body;
  const userId = req.user.id;
  const customer = await stripe.customers.create({
    metadata: { userId: `${userId}` }
   });
  
  try {
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

const handleStripeWebhook = async (request, response) => {
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  const data = event.data.object;
  const eventType = event.type;
  // Handle the event
  if (eventType === 'checkout.session.completed') {
    const customerId = data.customer;
    const paymentIntentId = data.payment_intent;
    const amount = data.amount_total;
    const status = data.payment_status;
    const customer = await stripe.customers.retrieve(data.customer);
    const userId = customer.metadata.userId;
    const account = await db.Account.findOne({ where: { userId } });
    await new AccountCreditor(amount, account).perform();
    await new TransactionCreator({
      db,
      paymentIntentId, 
      type: 'credit', 
      accountId: account.id, 
      amount, 
      status
    }).perform();
  } 
  // else {
  //   await new TransactionCreator({
  //     db,
  //     paymentIntentId: data.paymentIntent, 
  //     type: 'credit', 
  //     accountId: account.id, 
  //     amount: data.amount_total, 
  //     status: data.payment_status
  //   }).perform();
  // }
  response.send();
}

const makePayment = async(req, res) => {
  const { amount, orderId } = req.body;
  try {
    const userId = req.user.id;
    console.log("userid", userId);
    const account = await db.Account.findOne({ where: { userId } });
    console.log("account", account);
    await new AccountDebitor(amount, account, db).perform();

    /*await new TransactionCreator({
      db,
      paymentIntentId: orderId, 
      type: 'debit',
      accountId: account.id, 
      amount, 
      status: 'completed'
    }).perform();*/

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
