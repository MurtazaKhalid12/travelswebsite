const express = require('express');
const { createCheckoutSession, handleStripeWebhook } = require('../controllers/bookingController');
const bookingController = require('../controllers/bookingController')
const router = express.Router();

// Endpoint to create a Stripe checkout session
router.post('/create-checkout-session', createCheckoutSession);
router.get('/getbookingsinformation/:user_id',bookingController.getBookinginformation);
router.get('/user/:user_id', bookingController.getUserById);
// Stripe Webhook Endpoint
// Important: This endpoint must receive the raw request body, so we use express.raw here

module.exports = router;
