const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const Config = require('../config/roles')


const basicLogin = (req, res) => {
    console.log(req.body)
    if (!req.body.email || !req.body.password) return res.status(500).json({ 'status': 'Username and password are required' });
    const user = {
        email: req.body.email
    }
    try {
        User.findOne(user, 'email fullName password role', function(err,usr) {
            
            if (!usr || usr.length <= 0) {
                res.status(500).render('error', {errorCode: 500, errorMsg: "Uset not found"});
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
                res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

                // This will render the user profile page
                // For now, its returning json
                res.status(200).json({"status": "OK"})
            }

            // Wrong password
            else {
                res.status(401).render('error', {errorCode: 401, errorMsg: "Authentication failed"});
            }
        })
    }
    catch (err) {
        // An error occurred
        res.status(500).render('error', {errorCode: 500, errorMsg: "Internal server error"});
    }
}

// Allow authentication with OAuth (Google/Facebook)
const oAuthLogin = (req, res) => {
    
}



module.exports = {
    basicLogin,
    oAuthLogin
}