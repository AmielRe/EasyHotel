const { pipeline } = require('nodemailer/lib/xoauth2');
const Config = require('../config/roles');
const { collection } = require('../models/user');
const usersController = require('../controllers/usersController');
const User = require('../models/user');
const Response = require('../config/response')
const { all } = require('../routes/orders');
const { getJwtDetails } = require('../middleware/verifyJWT');


const getAdminPanel = async (req,res) => {
    res.render('admin-panel.ejs', {
        jwt: getJwtDetails(req.cookies.jwt)
    })
}

const getRolePanel = async (req,res) => {
    res.render('roles.ejs', {
        jwt: getJwtDetails(req.cookies.jwt)
    })
}

const getAllRoles = async (req,res) => {
    res.status(200).json(Config.ROLES)
}

const getRolesStatistics = (req,res) => {
    // Toki is the best
    User.aggregate([{"$group": {_id:"$role", count:{$sum:1}}}], function(err, results) {
        if ( err ) {
            res.status(500).json(Response.admin.getRolesError);
        }
        res.status(200).json(results);
    });
}

const getChatsPanel = (req,res) => {

    res.render('chats.ejs', {
        jwt: getJwtDetails(req.cookies.jwt)
    });
}

const getRatingPanel = (req,res) => {
    res.render('ratings.ejs', {
        jwt: getJwtDetails(req.cookies.jwt)
    });
}

module.exports = {
    getAdminPanel,
    getRolePanel,
    getAllRoles,
    getRolesStatistics,
    getChatsPanel,
    getRatingPanel
}