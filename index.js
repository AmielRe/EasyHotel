const express = require('express');
require('dotenv/config');

const app = express();


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

app.listen(process.env.PORT)