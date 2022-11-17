const { getJwtDetails } = require('../middleware/verifyJWT');
const Order = require('../models/order');
const mongoose = require('mongoose');
const initAccount = (req,res) => {

    Order.find({ userId: mongoose.Types.ObjectId(req.cookies.userId) })
    .then(orders => {
        res.status(200).render("account", {orders, jwt: getJwtDetails(req.cookies.jwt)})
    }).catch(err => {
        res.status(200).json({err});
    });
}

module.exports= {
    initAccount
}