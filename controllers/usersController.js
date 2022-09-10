const User = require('../models/users');
const Config = require('../config/roles')

// Get the currect user
const getAllUsers = (req,res) => {
    res.json({"username":"elad"});
}

// Register new user to the system
const addNewUser = async (req,res) => {

    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        role: Config.ROLES.guest
    });
    
    try {
        const newUser = await user.save();

        // User has added !
        res.render('login.ejs', {"errors":[]})
    }
    catch (err) {
        res.render('login.ejs', {"errors":[
            "Email already in use, Please enter another email"
        ]})
    }
}

// Will update a user
const updateUser = (req,res) => {
    res.json({"status":"ok"});
}

// Will delete a user from the system - Admin only
const deleteUser = (req,res) => {
    res.json({"id":req.params.id});
}

module.exports = {
    getAllUsers,
    addNewUser,
    updateUser,
    deleteUser
}

