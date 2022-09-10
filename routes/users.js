const express = require('express');
const usersController = require('../controllers/usersController');
const authentication = require('../middlewere/verifyJWT')

const router = express.Router();

router.route('/')
    .get(authentication.verifyJWT ,usersController.getAllUsers)
    .post(usersController.addNewUser)
    .put(usersController.updateUser)

router.route('/:id')
    .delete(usersController.deleteUser)

module.exports = router;