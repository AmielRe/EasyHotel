const express = require('express');
const { request } = require('http');
const { ROLES } = require('../config/roles');
const usersController = require('../controllers/usersController');
const authentication = require('../middleware/verifyJWT')

const router = express.Router();

router.route('/')
    .get(authentication.verifyJWT(ROLES.admin), usersController.getAllUsers)
    .post(usersController.addNewUser)

router.route('/:id')
    .put(authentication.verifyJWT(ROLES.admin), usersController.updateUser)
    .delete(authentication.verifyJWT(ROLES.admin) ,usersController.deleteUser)

module.exports = router;