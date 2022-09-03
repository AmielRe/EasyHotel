const express = require('express');
require('dotenv/config');
const mongoose = require('mongoose')

const app = express();
app.use(express.json());


// Routers
const ordersRoute = require('./routes/orders')
const roomsRoute = require('./routes/rooms')
const usersRoute = require('./routes/users')

// Use Routers
app.use('/orders', ordersRoute)
app.use('/rooms', roomsRoute)
app.use('/users', usersRoute)

// this will return the main page
app.get('/', (req,res) => {
    res.send("This will return the main page")
})

mongoose.connect(`mongodb://${process.env.dbUser}:${process.env.dbPass}@localhost:${process.env.dbPort}/EasyHotel`)
app.listen(process.env.PORT)