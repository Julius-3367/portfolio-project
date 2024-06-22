const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Assuming authController.js exists and is correctly implemented

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;

