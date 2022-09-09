const uuid = require('uuid')

const getAllRooms = (req,res) => {
    res.send("Will return all avalibe rooms in the hotel");
}

// Will add new room to the DB by the admin
const addNewRoom = (req,res) => {
    res.json({"id":uuid.v4()});
}

// Will update an exsisting room
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
    deleteRoom
}