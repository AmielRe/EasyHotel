const uuid = require('uuid');
const User = require('../models/user')
const Room = require('../models/room');
const Order = require('../models/order');
const Response = require('../config/response')
const emailSender = require('../middleware/email-sender');
const { getJwtDetails } = require('../middleware/verifyJWT');
const { addNewRoom } = require('../controllers/roomsController');
const mongoose = require('mongoose');

const { on } = require('../models/user');

const getAllOrders = async (req,res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    }

    catch ( err ) {
        console.log(err);
        res.status(500).json( {"error" : Response.status[500]})
    }
}

const showAvailableRooms = (req, res) => {
    res.render("../views/reservation", { checkInDate: req.body.checkInDate, checkOutDate: req.body.checkOutDate, jwt: getJwtDetails(req.cookies.jwt)});
}

const checkoutNewOrder = (req,res) => {
    const [rooms, totalCost] = parseRooms(req);

    res.render("../views/payment", { totalCost: totalCost, rooms: rooms, checkInDate: req.body.checkInDate, checkOutDate: req.body.checkOutDate, jwt: getJwtDetails(req.cookies.jwt) });
}

const getAllOrdersByDate = async (req, res) => {
    const checkInDate = req.query.checkInDate;
    const checkOutDate= req.query.checkOutDate;

    var checkInDateFormat = new Date(checkInDate);
    var checkOutDateFormat = new Date(checkOutDate);

    const ordersInDate = await Order.find({"checkinDate": {"$lte": checkInDateFormat,},
                                            "checkoutDate": {"$gte": checkOutDateFormat}}, 'rooms -_id');

    let roomTypes = [];
    ordersInDate.forEach(object => {
        object.rooms.forEach(room => {
            roomTypes.push(room._id);
        });
    });
    
    res.status(200).json(roomTypes);
}

const addNewOrder = async (req,res) => {
    const [rooms, totalCost] = parseRooms(req);

    const newOrder = new Order({
        totalCost: totalCost,
        rooms: rooms,
        checkinDate: req.body.checkInDate,
        checkoutDate: req.body.checkOutDate,
        userId: mongoose.Types.ObjectId(req.cookies.userId),
        userEmail: req.body.email
    });
    
    try {
        const newOrderObject = await newOrder.save();

        emailSender.sendEmail(req.body.email, req.body.firstName, req.body.checkInDate, req.body.checkOutDate, rooms, totalCost, newOrderObject.id);
    //console.log('req.body.email = > ', req.body.email);
           // Order was added !
        res.status(200).render("../views/confirmation", {
            totalCost: totalCost, 
            rooms: rooms, 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            bookingCode: newOrderObject.id,
            checkInDate: req.body.checkInDate,
            checkOutDate: req.body.checkOutDate,
            jwt: getJwtDetails(req.cookies.jwt)})
    }
    catch (err) {
        console.log(err)
        res.status(500).render('error', {errorCode: 500, errorMsg: "Internal server error", jwt: getJwtDetails(req.cookies.jwt)});
    }
}

const updateOrder = (req,res) => {
    res.json({"status":"OK"});
}

const deleteOrder = (req,res) => {
    Order.findOneAndDelete({"id": req.params.id}).exec()
    res.json({id: req.params.id});
}

const parseRooms = (req) => {
    const roomTypes = req.body.roomType;
    const roomPrices = req.body.roomPrice;
    const roomIds = req.body.roomIds;
    console.log(roomIds);

    let rooms = []
    let totalCost = 0;

    for (let i = 0; i < roomTypes.length; i++) {
        const room = Room({
            _id: roomIds[i],
            roomType: roomTypes[i],
            cost: parseInt(roomPrices[i])
        });
        console.log(room);
        
        totalCost += room.cost;

        rooms.push(room);
    }

    // return as array
    return [rooms, totalCost];
}

module.exports = {
    getAllOrders,
    addNewOrder,
    updateOrder,
    deleteOrder,
    checkoutNewOrder,
    showAvailableRooms,
    getAllOrdersByDate
}

