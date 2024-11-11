// index.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database'); // Database configuration
const dotenv = require('dotenv');
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);

// Basic route to check server status
app.get('/', (req, res) => {
    res.send('Welcome to the Slushie Ordering API');
});

// Database connection and server start
const startServer = async () => {
    try {
        // Authenticate the connection
        await db.authenticate(); // Use db directly, not db.sequelize
        console.log('Database connection established successfully.');

        // Sync models to the database (create tables if they don't exist)
        //await db.sync(); // You can pass { force: true } to recreate tables during development

        // Start server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

// Call the function to start the server
startServer();

module.exports = app; // Export app for testing if needed
