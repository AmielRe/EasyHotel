const express = require('express');
require('dotenv/config');
const mongoose = require('mongoose')

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public/css'))
app.use(express.static('public/images'))

// set the view engine to ejs
app.set('view engine', 'ejs');

// Routers
const ordersRoute = require('./routes/orders')
const roomsRoute = require('./routes/rooms')
const usersRoute = require('./routes/users')

// Use Routers
app.use('/orders', ordersRoute)
app.use('/rooms', roomsRoute)
app.use('/users', usersRoute)

// this will return the main page
app.get('/', (req, res) => {
    res.sendFile('login.html', { root: __dirname + "/public/html" });
})

mongoose.connect(`mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@easyhotel.6ku0zkj.mongodb.net/?retryWrites=true&w=majority`)
app.listen(process.env.PORT)