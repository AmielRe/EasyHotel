const uuid = require('uuid');
const Room = require('../models/room');
const Order = require('../models/order')

const getAllOrders = (req,res) => {
    res.send("Will return all of user orders");
}

const checkoutNewOrder = (req,res) => {
    const roomTypes = req.body.roomType;
    const roomPrices = req.body.roomPrice;

    let rooms = []
    let totalCost = 0;

    // If one item in cart, avoid iteration over characters
    if(roomTypes instanceof Array) {
        for (let i = 0; i < roomTypes.length; i++) {
            const room = new Room({
                roomType: roomTypes[i],
                cost: parseInt(roomPrices[i])
            });
            
            totalCost += room.cost;
    
            rooms.push(room);
        }
    } else {
        const room = new Room({
            roomType: roomTypes,
            cost: parseInt(roomPrices)
        });
        
        totalCost += room.cost;
        rooms.push(room);
    }

    res.render("../views/payment", { totalCost: totalCost, rooms: rooms });
}

const addNewOrder = async (req,res) => {
    const roomTypes = req.body.roomType;
    const roomPrices = req.body.roomPrice;

    let rooms = []
    let totalCost = 0;

    // If one item in cart, avoid iteration over characters
    if(roomTypes instanceof Array) {
        for (let i = 0; i < roomTypes.length; i++) {
            const room = new Room({
                roomType: roomTypes[i],
                cost: parseInt(roomPrices[i])
            });
            
            totalCost += room.cost;
    
            rooms.push(room);
        }
    } else {
        const room = new Room({
            roomType: roomTypes,
            cost: parseInt(roomPrices)
        });
        
        totalCost += room.cost;
        rooms.push(room);
    }

    const newOrder = new Order({
        totalCost: totalCost,
        rooms: rooms
    })

    try {
        const newOrderObject = await newOrder.save();

        // Order was added !
        res.status(200).json({"status": "Order was added!"})
    }
    catch (err) {
        res.status(500).json({"status": "Internal server error."})
    }
}

const UpdateOrder = (req,res) => {
    res.json({"status":"OK"});
}

const deleteOrder = (req,res) => {
    res.json({"id":req.params.id});
}

module.exports = {
    getAllOrders,
    addNewOrder,
    UpdateOrder,
    deleteOrder,
    checkoutNewOrder
}

