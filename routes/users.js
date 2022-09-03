const express = require('express');
const { getUser, addUser, deleteUser } = require('../controllers/usersController');

const router = express.Router();

// Gets details about the current user (By the cookie)
router.get('/', getUser);

// Add new user to the system - only Admins
router.post('/', addUser);

// Deletes a user from the system - only Admins
router.delete('/:id', deleteUser);

module.exports = router;