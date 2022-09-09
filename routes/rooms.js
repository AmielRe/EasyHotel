const express = require('express');
const roomsController = require('../controllers/roomsController');

const router = express.Router();

router.route('/')
    .get(roomsController.getAllRooms)
    .post(roomsController.addNewRoom)
    .put(roomsController.updateRoom)


router.route('/:id')
    .delete(roomsController.deleteRoom)

module.exports = router;