const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (role) => {
    return (req, res, next) => { 
        var token = req.get('Cookie').split("=")[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403); //invalid token
                if (role != decoded.UserInfo.role) return res.sendStatus(403);
                email = decoded.UserInfo.email;
                role = decoded.UserInfo.role;
                next()
            }
        );
    }
}

module.exports = {
    verifyJWT
}