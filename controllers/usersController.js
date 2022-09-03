const uuid = require('uuid')
const User = require('../models/users');

// Get the currect user
const getUser = (req,res) => {
    res.json(User.find({"username":"elad"}));
}

// Will update user details - Admin only
const addUser = async (req,res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        type: 1
    });
    console.log(user, typeof(user));
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

// Will delete a user from the system - Admin only
const deleteUser = (req,res) => {
    res.json({"id":req.params.id});
}

exports.getUser = getUser;
exports.addUser = addUser;
exports.deleteUser = deleteUser;

