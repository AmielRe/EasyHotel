const uuid = require('uuid')
const Room = require('../models/room');
const Response = require('../config/response');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
var fs = require('fs');

const getAllRooms = async (req,res) => {
    try {
        const rooms = await Room.find();

        res.status(200).json(rooms);
    }
    catch ( err ) {
        res.status(500).json({ "error": Response.status[500]});
    }
}

// Will add new room to the DB by the admin
const addNewRoom = async (req,res) => {
    try {
        const room = new Room({
            roomType: req.body.roomType,
            cost: req.body.cost
        });

        newRoom = room.save();
        res.status(200).json({"status" : Response.status[200]});
    }
    
    catch ( err ) {
        res.status(500).json({"status" : Response.status[500]});
    }
}


const addNewRoomFile = (req,res) => {
    const fileName = req.file.filename;
    fs.readFile(`uploads/${fileName}`, 'utf8', function (err, data) {
        if (err) {
            res.status(500).json({"error": Response.status[500]})
        };
        
        const roomList = JSON.parse(data);
        try {
            Room.insertMany(roomList);

            res.status(200).json({"status": Response.status[200]})
        }

        catch( err ) {
            res.status(500).json({"error": Response.status[500]});
        }
        
      });

};

// Will update an existing room
const updateRoom = (req,res) => {
    res.json({"id":uuid.v4()});
}

// Will delete a room from the DB by admin
const deleteRoom = (req,res) => {
    res.json({"id":req.params.id});
}

module.exports = {
    getAllRooms,
    addNewRoom,
    updateRoom,
    deleteRoom,
    addNewRoomFile
}