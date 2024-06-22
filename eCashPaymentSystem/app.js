require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON payloads
app.use(express.static('public')); // Serve static files from 'public' directory

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // Ensure MongoDB uses indexes for better performance
    useFindAndModify: false // Disable deprecated findAndModify
}).then(() => {
    console.log('MongoDB connected');
}).catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process on connection error
});

// Routes
app.use('/api/auth', authRoutes); // Mount authentication routes
app.use('/api/payments', paymentRoutes); // Mount payment routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

