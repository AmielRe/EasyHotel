const uuid = require('uuid')
const User = require('../models/users');

// Get the currect user
const getAllUsers = (req,res) => {
    res.json({"username":"elad"});
}

// Will update user details - Admin only
const addNewUser = async (req,res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        type: 1
    });
    
    try {
        const newUser = await user.save();

        // User has added !
        res.json(newUser);
    }
    catch (err) {

        // Error - user already exsists or something else
        res.json(err);
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

