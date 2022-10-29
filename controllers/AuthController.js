const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const Config = require('../config/roles')
const { getJwtDetails } = require('../middleware/verifyJWT');

const login = (req, res) => {
    if (!req.body.email || !req.body.password) return res.status(500).render('error', {errorCode: 500, errorMsg: "Username and password are required.", jwt: getJwtDetails(req.cookies.jwt)});
    const user = {
        email: req.body.email
    }
    try {
        User.findOne(user, 'email fullName password role', function(err,usr) {
            if (!usr || usr.length <= 0) {
                res.status(500).render('error', {errorCode: 500, errorMsg: "User not found", jwt: getJwtDetails(req.cookies.jwt)});
            }

            // Correct password !
            if (usr.password == req.body.password) {

                // Sign the JWT with the secret key for 2 hours
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "email": usr.email,
                            "fullName": usr.fullName,
                            "role": usr.role
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '2h' }
                );
                
                // Set the jwt as a cookie (Need to change this).
                res.cookie('jwt', accessToken, { httpOnly: false, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

                // Return /admin for admins and /personal for guests
                if ( usr.role == Config.ROLES.admin ) {
                    res.status(200).json({"redirect": "/admin"});
                }
                else {
                    res.status(200).json({"redirect": "/personal"});
                }
            }
            // Wrong password
            else {
                res.status(401).render('error', {errorCode: 401, errorMsg: "Authentication failed", jwt: getJwtDetails(req.cookies.jwt)});
            }
        })
    }
    catch (err) {
        // An error occurred
        res.status(500).render('error', {errorCode: 500, errorMsg: "Internal server error", jwt: getJwtDetails(req.cookies.jwt)});
    }
}

const logout = (req, res) => {
    res.clearCookie("jwt");
    res.status(200).render('partials/header', {jwt: false})
}

module.exports = {
    login,
    logout
}