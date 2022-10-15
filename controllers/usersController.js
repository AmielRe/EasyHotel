const User = require('../models/user');
const Config = require('../config/roles')

// Get the correct user
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
        res.status(500).render('error', {errorCode: 500, errorMsg: "Email already in use"});
    }
}

// Will update a user
const updateUser = (req,res) => {
    var newData = {
        "fullName": req.body["0"],
        "email": req.body["1"],
        "role": req.body["2"]
    }

    try {
        User.updateOne({'_id': req.params.id}, {$set:newData}, function(err, response) {
            if (err) {
                res.status(500).json({"status":err})
            }
            else {
                res.status(200).json({"status":"User has been updated"})
            }
        });
    }

    catch (err) {
        res.status(500).json({"status": "Something has happend"})
    }

}

// Will delete a user from the system - Admin only
const deleteUser = async (req,res) => {
    try {
        await User.deleteOne({"_id": req.params.id});

        res.status(200).json({"status": "User deleted !"});
    }
    catch (err) {
        res.status(500).json({"status": "Error"})
    }
}

module.exports = {
    getAllUsers,
    addNewUser,
    updateUser,
    deleteUser
}