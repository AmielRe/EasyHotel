const uuid = require('uuid');
const Room = require('../models/room');
const Order = require('../models/order');
const emailSender = require('../middleware/email-sender');
const { getJwtDetails } = require('../middleware/verifyJWT');

const getAllOrders = (req,res) => {
    res.json(Order.find().exec());
}

const showAvailableRooms = (req, res) => {
    res.render("../views/reservation", { checkInDate: req.body.checkInDate, checkOutDate: req.body.checkOutDate, jwt: getJwtDetails(req.cookies.jwt)});
}

const checkoutNewOrder = (req,res) => {
    const [rooms, totalCost] = parseRooms(req);

    res.render("../views/payment", { totalCost: totalCost, rooms: rooms, checkInDate: req.body.checkInDate, checkOutDate: req.body.checkOutDate, jwt: getJwtDetails(req.cookies.jwt) });
}

const addNewOrder = async (req,res) => {
    const [rooms, totalCost] = parseRooms(req);

    const newOrder = new Order({
        totalCost: totalCost,
        rooms: rooms
    })

    try {
        const newOrderObject = await newOrder.save();

        emailSender.sendEmail(req.body.Email, req.body.FirstName, req.body.checkInDate, req.body.checkOutDate, rooms, totalCost, newOrderObject.id);

        // Order was added !
        res.status(200).render("../views/confirmation", {
            totalCost: totalCost, 
            rooms: rooms, 
            firstName: req.body.FirstName,
            lastName: req.body.LastName,
            email: req.body.Email,
            bookingCode: newOrderObject.id,
            checkInDate: req.body.checkInDate,
            checkOutDate: req.body.checkOutDate,
            jwt: getJwtDetails(req.cookies.jwt)})
    }
    catch (err) {
        res.status(500).render('error', {errorCode: 500, errorMsg: "Internal server error", jwt: getJwtDetails(req.cookies.jwt)});
    }
}

const UpdateOrder = (req,res) => {
    res.json({"status":"OK"});
}

const deleteOrder = (req,res) => {
    Order.findOneAndDelete({"id": req.params.id}).exec()
    res.json({id: req.params.id});
}

const parseRooms = (req) => {
    const roomTypes = req.body.roomType;
    const roomPrices = req.body.roomPrice;

    let rooms = []
    let totalCost = 0;

    for (let i = 0; i < roomTypes.length; i++) {
        const room = new Room({
            roomType: roomTypes[i],
            cost: parseInt(roomPrices[i])
        });
        
        totalCost += room.cost;

        rooms.push(room);
    }

    // return as array
    return [rooms, totalCost];
}

module.exports = {
    getAllOrders,
    addNewOrder,
    UpdateOrder,
    deleteOrder,
    checkoutNewOrder,
    showAvailableRooms
}

