const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

require('dotenv/config');
const mongoose = require('mongoose')


app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public/css'))
app.use(express.static('public/js'))
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
    res.render('login.ejs', {"errors":[]})
})

io.on('connection', function(socket) {
    console.log('A user connected');
    
    // todo: make socket array with users id
    // so we can communicate with them.
    console.log("User ==> ",  socket.id)
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });

mongoose.connect(`mongodb${process.env.prod}://${process.env.dbUser}:${process.env.dbPass}@${process.env.dbHost}`)
http.listen(process.env.PORT)