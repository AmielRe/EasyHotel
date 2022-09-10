const uuid = require('uuid')

const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const User = require('../models/users');

// Get the currect user
const getAllUsers = (req,res) => {
    res.json({"username":"elad"});
}

// Will update user details - Admin only
const addNewUser = async (req,res) => {

    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        type: 1
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

