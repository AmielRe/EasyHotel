const Chat = require('../models/chat');
const  { getJwtDetails, getJWTFromCookie } = require('../middleware/verifyJWT')
const userUtil = require('../socket-io-utils/user');
const chat = require('../models/chat');

const addMessage = (io, data) => {
    // data - destination && content
    const chat = {
        source: getJwtDetails(data.token).email,
        destination: data.destination,
        content: data.content
    }

    const msg = new Chat(chat);

    try {
        msg.save();
    }
    catch (err) {
        console.log(err)
    }

    dstUser = userUtil.getUserByEmail(data.destination);
    if ( dstUser ) {
        io.to(dstUser.id).emit('newMsg', chat);
    }
    
}


const getAllUserMessages = (req, res) => {
    source = req.params.email;
    destination = getJWTFromCookie(req.cookies.jwt).email;

    console.log("source ==> ", source);
    console.log("dst ==> ", destination);
    
    chat.find(
        { "$or" : [
        { "$and": [ {source: source }, {destination: destination }] },
        { "$and": [ {source: destination },{destination: source }]} ] }, 
        
        function(err, chats) {
        if (err) {
            res.status(500).json({"status": "Error getting chats."})
        }


        res.status(200).json(chats);
    });
}

module.exports = {
    addMessage,
    getAllUserMessages
}