const express = require('express');
const roomsController = require('../controllers/roomsController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.route('/')
    .get(roomsController.getAllRooms)
    .post(roomsController.addNewRoom)

router.route('/file')
    .post(upload.single('rooms'), roomsController.addNewRoomFile)


router.route('/:id')
    .delete(roomsController.deleteRoom)
    .put(roomsController.updateRoom)

module.exports = router;