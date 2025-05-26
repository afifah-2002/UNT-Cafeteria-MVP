// routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe here

// Webhook endpoint
router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Use req.rawBody which was populated by express.raw() middleware
        event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            console.log(`PaymentIntent ${paymentIntentSucceeded.id} succeeded!`);
            // TODO: Update your order status in MongoDB to "paid"
            // You can access paymentIntentSucceeded.customer and paymentIntentSucceeded.metadata
            // to link it back to your internal user/order.
            break;
        case 'payment_method.attached':
            const paymentMethodAttached = event.data.object;
            console.log(`PaymentMethod ${paymentMethodAttached.id} attached to customer ${paymentMethodAttached.customer}.`);
            // You might log this or perform an action, but the setupIntent success is more direct.
            break;
        case 'setup_intent.succeeded':
            const setupIntentSucceeded = event.data.object;
            console.log(`SetupIntent ${setupIntentSucceeded.id} succeeded for customer ${setupIntentSucceeded.customer}.`);
            // The payment method is now available for future use.
            // You might want to update a flag in your User model indicating they have a saved card.
            break;
        // Add more event types as needed for your application
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
});

module.exports = router;