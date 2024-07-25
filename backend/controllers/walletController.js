const { stripe } = require("../config/lib/stripe");
const { v4: uuidv4 } = require('uuid');

const createStripeCheckout = async (req, res) => {
  const { amount, userId } = req.body;
  
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
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        userId,
        sessionId,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const handleStripeWebhook = (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { userId, sessionId } = session.metadata;
  
      if (userWallets[sessionId] && userWallets[sessionId].status === 'pending') {
        userWallets[sessionId].status = 'completed';
  
        // Update user wallet balance
        if (!userWallets[userId]) {
          userWallets[userId] = 0;
        }
        userWallets[userId] += userWallets[sessionId].amount;
      }
    }
  
    res.json({ received: true });
}

module.exports = {
  createStripeCheckout,
  handleStripeWebhook,
};
