const User = require('../models/user');
const Chat = require('../models/chat');
const Config = require('../config/roles');
const usersController = require('../controllers/usersController');
const { getJwtDetails } = require('../middleware/verifyJWT');

const personalSpace = (req,res) => {
    res.render("../views/guest-panel.ejs", {jwt: getJwtDetails(req.cookies.jwt)})
}

const getChatsPanel = (req,res) => {

    // We will need to render admin list and the chat list for this user by the cookie
    res.render('chats.ejs', { 
        isAdmin : false,
        jwt: getJwtDetails(req.cookies.jwt)
    });
};

module.exports = {
    personalSpace,
    getChatsPanel
}