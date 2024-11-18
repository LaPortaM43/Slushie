// index.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database'); // Database configuration
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');
const flavorRoutes = require('./routes/flavors');
const comboRoutes = require('./routes/combos');
const branchRoutes = require('./routes/branches');
const orderRoutes = require('./routes/orders');


//import models
const Customer = require('./models/customer');
const Order = require('./models/order');
const Flavor = require('./models/flavor');
const Branch = require('./models/branch');
const Combo = require('./models/combo');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
/*app.use(cors({
    origin: 'https://laportam43.github.io/Slushie', 
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));*/

//Define Associations
Customer.hasMany(Order, { foreignKey: 'customerID', as: 'orders' });
Order.belongsTo(Customer, { foreignKey: 'customerID', as: 'customer' });

Flavor.hasMany(Order, { foreignKey: 'flavor1ID', as: 'flavor1Orders' });
Flavor.hasMany(Order, { foreignKey: 'flavor2ID', as: 'flavor2Orders' });
Flavor.hasMany(Order, { foreignKey: 'flavor3ID', as: 'flavor3Orders' });

Order.belongsTo(Flavor, { foreignKey: 'flavor1ID', as: 'Flavor1' });
Order.belongsTo(Flavor, { foreignKey: 'flavor2ID', as: 'Flavor2' });
Order.belongsTo(Flavor, { foreignKey: 'flavor3ID', as: 'Flavor3' });

Branch.hasMany(Order, { foreignKey: 'branchID', as: 'branchOrders' });
Order.belongsTo(Branch, { foreignKey: 'branchID', as: 'branch' });

Customer.hasMany(Combo, { foreignKey: 'customerID', as: 'combos' });
Combo.belongsTo(Customer, { foreignKey: 'customerID', as: 'customer' });

Flavor.hasMany(Combo, { foreignKey: 'flavor1ID', as: 'flavor1Combos' });
Flavor.hasMany(Combo, { foreignKey: 'flavor2ID', as: 'flavor2Combos' });
Flavor.hasMany(Combo, { foreignKey: 'flavor3ID', as: 'flavor3Combos' });

Combo.belongsTo(Flavor, { foreignKey: 'flavor1ID', as: 'Flavor1' });
Combo.belongsTo(Flavor, { foreignKey: 'flavor2ID', as: 'Flavor2' });
Combo.belongsTo(Flavor, { foreignKey: 'flavor3ID', as: 'Flavor3' });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/flavors', flavorRoutes);
app.use('/api/combos', comboRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/orders', orderRoutes);

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
