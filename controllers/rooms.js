const uuid = require('uuid')

const getRooms = (req,res) => {
    res.send("Will return all avalibe rooms in the hotel");
}

// Will add new room to the DB by the admin
const addRoom = (req,res) => {
    res.json({"id":uuid.v4()});
}

// Will delete a room from the DB by admin
const deleteRoom = (req,res) => {
    res.json({"id":req.params.id});
}

exports.getRooms = getRooms;
exports.addRoom = addRoom;
exports.deleteRoom = deleteRoom;

