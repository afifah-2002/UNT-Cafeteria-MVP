// routes/stripeRoutes.js
const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');
// const authMiddleware = require('../middleware/authMiddleware'); // Uncomment when you add auth

// Temporarily skip authentication for now
// When you implement authentication, uncomment the authMiddleware
// and replace (req, res) => stripeController.createSetupIntent(req, res)
// with authMiddleware, stripeController.createSetupIntent
// For now, we'll just remove the middleware.

// Route for creating a Setup Intent (to add a new payment method)
router.post('/create-setup-intent', stripeController.createSetupIntent);

// Route for getting a customer's saved payment methods
router.post('/get-payment-methods', stripeController.getPaymentMethods);

// Route for creating a Payment Intent (to make a payment)
router.post('/create-payment-intent', stripeController.createPaymentIntent);

router.post('/detach-payment-method', stripeController.detachPaymentMethod);

module.exports = router;