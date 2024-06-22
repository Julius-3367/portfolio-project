const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken'); // Assuming verifyToken middleware is in this directory
const PaymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming authMiddleware is in this directory

// Route for making a payment using authMiddleware
router.post('/pay', authMiddleware, PaymentController.makePayment);

// Alternatively, you can use verifyToken middleware directly
// router.post('/pay', verifyToken, PaymentController.makePayment);

module.exports = router;

