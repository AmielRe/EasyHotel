const express = require('express');
const { request } = require('http');
const { ROLES } = require('../config/roles');
const usersController = require('../controllers/usersController');
const authentication = require('../middlewere/verifyJWT')

const router = express.Router();

router.route('/')
    .get(authentication.verifyJWT(ROLES.admin) ,usersController.getAllUsers)
    .post(usersController.addNewUser)
    .put(usersController.updateUser)

router.route('/:id')
    .delete(usersController.deleteUser)

module.exports = router;