const User = require('../models/users');
const Config = require('../config/roles')

// Get the currect user
const getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.json({"status": "err"});
    }
    
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
        res.status(200).json({"status": "User has added !"})
    }
    catch (err) {
        res.status(500).json({"status": "Email already in use."})
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

