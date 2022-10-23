const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (role) => {
    return (req, res, next) => {
        var token = req.cookies.jwt;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.status(403).render('error', {errorCode: 403, errorMsg: "Invalid token"});
                if (role != decoded.UserInfo.role) return res.status(403).render('error', {errorCode: 403, errorMsg: "Invalid role"});
                next()
            }
        );
    }
}

const getJwtDetails = (token) => {
    userDetails = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return false; //invalid token
            if (decoded) return decoded.UserInfo;
        }
    );
    return userDetails;
}

const getJWTFromCookie = (token) => {

    userDetails = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return false; //invalid token
            if (decoded) return decoded.UserInfo;
        }
    );
    return userDetails;
}

module.exports = {
    verifyJWT,
    getJwtDetails,
    getJWTFromCookie
}