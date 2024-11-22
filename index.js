// index.js

// cd Documents/SlushieTest/SlushieBackEnd
// npm run dev OR node index.js
// npm start for frontend

import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';

// Import routes
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import flavorRoutes from './routes/flavorRoutes.js';
import comboRoutes from './routes/comboRoutes.js';
import branchRoutes from './routes/branchRoutes.js'
import orderRoutes from './routes/orderRoutes.js';

// Initialize Express 
dotenv.config();
const app = express();
const PORT = process.env.PORT; 
app.use(express.json());

/*
// Connecting to the front-end
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));
*/
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/flavors', flavorRoutes);
app.use('/api/combos', comboRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/orders', orderRoutes);
 
// This function is invoked whenver there is an error 
app.use((err, req, res, next) => { 
    console.error(err.stack);
    res.status(500).send("Something broke!");
})

// This creates the server and handles incoming requests 
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
})

