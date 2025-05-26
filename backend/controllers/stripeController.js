// controllers/stripeController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/Users'); // Import your User model

// Helper function to get or create Stripe Customer
async function getOrCreateStripeCustomer(userId) {
  let user = await User.findById(userId);

  if (!user) {
    console.warn(`User with ID ${userId} not found in DB. Attempting to create a dummy user.`);
    user = await User.findOne({ username: 'temp_unauth_user' });
    if (!user) {
      user = new User({ euid: 121212, password: 'temp', name: 'tempUser', email: 'temp_unauth@example.com', _id: userId });
      await user.save();
    } else if (user._id.toString() !== userId) {
      // If a temp user exists but its ID doesn't match the requested one,
      // you might need to create a new temp user or handle this case.
      // For simplicity, we'll try to use the existing temp_unauth_user.
      // In a real scenario, this would be an error.
      console.warn(`Attempting to use existing temp_unauth_user for requested userId ${userId}.`);
    }
  }

  if (!user.stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: {
        userId: user._id.toString(), // Link to your internal user ID
      },
    });
    user.stripeCustomerId = customer.id;
    await user.save();
  }
  return user.stripeCustomerId;
}

// Controller function to create a Setup Intent
exports.createSetupIntent = async (req, res) => {
  const { userId } = req.body; // Comes from frontend for now. Later: req.user.id
  try {
    const customerId = await getOrCreateStripeCustomer(userId);

    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      usage: 'off_session',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customerId },
      { apiVersion: '2022-11-15' } // Ensure API version matches your Stripe account
    );

    res.json({
      setupIntentClientSecret: setupIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customerId: customerId,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error) {
    console.error('Error in createSetupIntent:', error);
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get saved Payment Methods
exports.getPaymentMethods = async (req, res) => {
  const { userId } = req.body; // Comes from frontend for now. Later: req.user.id
  try {
    const user = await User.findById(userId);
    if (!user || !user.stripeCustomerId) {
      // If user not found (e.g., first call for a new unauthenticated user),
      // ensure customer is created and return empty list.
      await getOrCreateStripeCustomer(userId);
      return res.json({ paymentMethods: [] });
    }

    const paymentMethods = await stripe.customers.listPaymentMethods(
      user.stripeCustomerId,
      { type: 'card' }
    );

    res.json({ paymentMethods: paymentMethods.data });
  } catch (error) {
    console.error('Error in getPaymentMethods:', error);
    res.status(500).json({ error: error.message });
  }
};

// Controller function to create a Payment Intent
exports.createPaymentIntent = async (req, res) => {
  const { amount, currency, userId, paymentMethodId } = req.body; // userId from frontend. Later: req.user.id
  try {
    const customerId = await getOrCreateStripeCustomer(userId);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
      return_url: 'stripe-redirect://payment-confirmation',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error in createPaymentIntent:', error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

exports.detachPaymentMethod = async (req, res) => {
  const { paymentMethodId } = req.body;
  try {
    // Stripe automatically handles permissions; you can only detach methods
    // that belong to customers in your account.
    const detachedPaymentMethod = await stripe.paymentMethods.detach(
      paymentMethodId
    );
    res.json({ success: true, detachedPaymentMethod });
  } catch (error) {
    console.error('Error detaching payment method:', error);
    // Provide more specific error messages from Stripe if needed
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: error.message });
  }
};