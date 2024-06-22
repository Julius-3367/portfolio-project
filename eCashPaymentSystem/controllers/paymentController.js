const Transaction = require('../models/transaction');
const axios = require('axios');
const QRCode = require('qrcode');

const makePayment = async (req, res) => {
    const { userId, amount, method } = req.body;
    try {
        const transaction = new Transaction({ userId, amount, method });
        await transaction.save();
        
        // Simulate payment processing with MPESA or Bank (Mock)
        const response = await axios.post('https://payment-api.example.com', {
            amount,
            method
        });

        if (response.data.success) {
            transaction.status = 'completed';
            await transaction.save();
        } else {
            transaction.status = 'failed';
            await transaction.save();
        }

        // Generate QR Code
        const qrCode = await QRCode.toDataURL(`payment://transaction/${transaction._id}`);
        
        res.status(201).json({ transaction, qrCode });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { makePayment };

