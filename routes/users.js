const express = require('express');
const { ROLES } = require('../config/roles');
const usersController = require('../controllers/usersController');
const authentication = require('../middleware/verifyJWT')

const router = express.Router();

router.route('/')
    .get(authentication.verifyJWT([ROLES.admin]), usersController.getAllUsers)
    .post(usersController.addNewUser)

router.route('/getUser')
    .get(authentication.verifyJWT([ROLES.guest, ROLES.admin]), usersController.getUser)

router.route('/admins')
    .get(authentication.verifyJWT([ROLES.guest]), usersController.getAllAdmins)

router.route('/:id')
    .put(authentication.verifyJWT([ROLES.admin, ROLES.guest]), usersController.updateUser)
    .delete(authentication.verifyJWT([ROLES.admin]) ,usersController.deleteUser)

module.exports = router;