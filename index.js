// index.js

import express from 'express'
import dotenv from 'dotenv' 
import {getCustomers, getCustomer, createCustomer} from './Database/customers.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT; 

// the youtube tutorial said to use this, idk why 
app.use(express.json())

// (req, res) req = request person makes to the server, res = response the server sends back 
app.get("/customers", async (req, res) => { 
    const customers = await getCustomers()
    res.send(customers)
})

app.post("/customers", async(req, res) => {
    const {customerID, customerName, customerEmail, customerAddress, customerPassword} = req.body
    const customer = await createCustomer(customerName, customerEmail, customerAddress, customerPassword)
    // Status code 201 means created 
    res.status(201).send(customer)
});

// This function is invoked whenver there is an error 
app.use((err, req, res, next) => { 
    console.error(err.stack)
    res.status(500).send("Something broke!")
})

// This creates the server and handles incoming requests 
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`)
})

// !!Command to start server!!
// cd documents/slushie 
// npm run dev
// installed nodemon, env, thunderclient, and changed package type to "module" 