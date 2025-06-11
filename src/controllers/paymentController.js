require('dotenv').config({ path: 'src/.env' });
const Stripe = require('stripe');
const WebhookEvent = require('../models/WebhookEvent');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: 'Premium Plan' },
          unit_amount: 999,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });
  res.json({ url: session.url });
};

const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  await WebhookEvent.create({
    platform: 'stripe',
    eventType: event.type,
    payload: event.data,
    receivedAt: new Date()
  });
  res.status(200).json({ received: true });
};
module.exports={createCheckoutSession,stripeWebhook}