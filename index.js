const express = require('express');
const app = express();
const path = require('path')

const http = require('http').Server(app);
const io = require('socket.io')(http);

require('dotenv/config');
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use( bodyParser.json() ); 
app.use(cookieParser());

app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/orders', express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'public/js')));

// set the view engine to ejs
app.set('view engine', 'ejs');

// Routers
const ordersRoute = require('./routes/orders')
const roomsRoute = require('./routes/rooms')
const usersRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const adminRoute = require('./routes/admin')
const servicesRoute = require('./routes/services')
const personalRoute = require('./routes/personal')

// Use Routers
app.use('/orders', ordersRoute)
app.use('/rooms', roomsRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute)
app.use('/admin', adminRoute)
app.use('/services', servicesRoute)
app.use('/personal', personalRoute)

// this will return the main page
app.get('/', (req, res) => {
    res.render('landingPage.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
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