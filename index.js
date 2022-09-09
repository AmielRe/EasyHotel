const express = require('express');
require('dotenv/config');
const mongoose = require('mongoose')

const app = express();
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
    res.render('login.ejs')
})

mongoose.connect(`mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@${process.env.dbHost}`)
app.listen(process.env.PORT)