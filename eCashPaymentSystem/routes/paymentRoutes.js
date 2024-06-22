const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming authMiddleware is in this directory
const verifyToken = require('../middleware/verifyToken'); // Assuming verifyToken middleware is in this directory

// Route for making a payment using authMiddleware
router.post('/pay', authMiddleware, PaymentController.makePayment);

// Alternative route using verifyToken middleware
// Uncomment the line below if you prefer to use verifyToken middleware
// router.post('/pay', verifyToken, PaymentController.makePayment);

module.exports = router;

