const User = require('../models/user');
const Chat = require('../models/chat');
const Config = require('../config/roles');
const usersController = require('../controllers/usersController');
const Order = require('../models/order');
const mongoose = require('mongoose');

const { getJwtDetails } = require('../middleware/verifyJWT');

const personalSpace = (req,res) => {
    Order.find({ userId: mongoose.Types.ObjectId(req.cookies.userId) })
    .then(orders => {
        res.status(200).render("../views/guest-panel.ejs", {orders, jwt: getJwtDetails(req.cookies.jwt)});

    }).catch(err => {
        res.status(500).json({err});
    });

    
}

const getChatsPanel = (req,res) => {

    // We will need to render admin list and the chat list for this user by the cookie
    res.render('chats.ejs', {
        jwt: getJwtDetails(req.cookies.jwt)
    });
};

module.exports = {
    personalSpace,
    getChatsPanel
}