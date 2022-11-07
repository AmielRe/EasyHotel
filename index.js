const express = require('express');
const app = express();
const path = require('path');

const http = require('http').Server(app);
const io = require('socket.io')(http);
const { getJwtDetails } = require('./middleware/verifyJWT')

// Store user details for socket.io emits
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getAllUsers,
} = require("./socket-io-utils/user");

require('dotenv/config');
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/orders', express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'public/js')));
app.use('/chat', express.static(path.join(__dirname, 'public/js/chats')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

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
const chatRoute = require('./routes/chats');
const ratingRoute = require('./routes/rating');
const accountRoute = require('./routes/account');
const { futimesSync } = require('fs');

// Use Routers
app.use('/orders', ordersRoute)
app.use('/rooms', roomsRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute)
app.use('/admin', adminRoute)
app.use('/services', servicesRoute)
app.use('/personal', personalRoute)
app.use('/chat', chatRoute)
app.use('/rating', ratingRoute)
app.use('/account', accountRoute)


// Controllers
const chatController = require('./controllers/chatController');
const { sendEmail } = require('./middleware/email-sender');

// this will return the main page
app.get('/', (req, res) => {
    res.render('landingPage.ejs', { "jwt": getJwtDetails(req.cookies.jwt) })
})

app.get('/login', (req, res) => {
    res.render('login.ejs', { "jwt": getJwtDetails(req.cookies.jwt) })
})

io.on('connection', function (socket) {
    socket.on('join', function (data) {
        userDetails = getJwtDetails(data["token"]);
        userJoin(socket.id, userDetails.email, userDetails.fullName);

        // Print everytime a user joins the chats room.
        console.table(getAllUsers());
    });

    socket.on('disconnect', function () {
        userLeave(socket.id)
    });

    socket.on('newMessage', function (data) {
        chatController.addMessage(io, data)
    });
});

mongoose.connect(`mongodb${process.env.prod}://${process.env.dbUser}:${process.env.dbPass}@${process.env.dbHost}`)
http.listen(process.env.PORT);


