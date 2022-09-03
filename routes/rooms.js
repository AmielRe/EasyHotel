const express = require('express');
const { getRooms, addRoom, deleteRoom } = require('../controllers/rooms');

const router = express.Router();

// Gets all rooms - get details about all the avalible rooms;
router.get('/', getRooms);

// Add new room to the DB - only Admins
router.post('/', addRoom);

// Deletes room - only Admins
router.delete('/:id', deleteRoom);

module.exports = router;