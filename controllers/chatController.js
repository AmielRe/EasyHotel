const Chat = require('../models/chat');

const addMessage = (socket, data) => {
    socket.emit('test', {"dsa":"123"})
}


const getAllUserMessages = (req, res) => {
    // get all users messages by the cookie email
    // For admins getallusers
    // For users getallAdmins
    // User will be able to chat only admins and
    // Admins will be able to chat all guests,
    // workers and managers
    res.status(200).json([{
        "source": "admin@admin.com",
        "destination": "b@b.com",
        "content": "first msg"
    }])
}



module.exports = {
    addMessage,
    getAllUserMessages
}