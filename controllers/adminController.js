const { pipeline } = require('nodemailer/lib/xoauth2');
const Config = require('../config/roles');
const { collection } = require('../models/user');
const usersController = require('../controllers/usersController');
const User = require('../models/user');
const { all } = require('../routes/orders');


const getAdminPanel = async (req,res) => {
    res.render('admin-panel.ejs')
}

const getRolePanel = async (req,res) => {
    res.render('roles.ejs')
}

const getAllRoles = async (req,res) => {
    res.status(200).json(Config.ROLES)
}

const getRolesStatistics = (req,res) => {
    // Toki is the best
    User.aggregate([{"$group": {_id:"$role", count:{$sum:1}}}], function(err, results) {
        res.status(200).json(results);
    });
}

const getChatsPanel = (req,res) => {

    res.render('chats.ejs', { 
        isAdmin : true
    });
}

const getRatingPanel = (req,res) => {
    res.render('ratings.ejs');
}

module.exports = {
    getAdminPanel,
    getRolePanel,
    getAllRoles,
    getRolesStatistics,
    getChatsPanel,
    getRatingPanel
}