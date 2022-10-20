const express = require('express');
const { request } = require('http');
const { ROLES } = require('../config/roles');
const adminController = require('../controllers/adminController');
const authentication = require('../middleware/verifyJWT')

const router = express.Router();

router.route('/')
    //.get(authentication.verifyJWT(ROLES.admin) ,adminController.getAdminPanel)

    // debug
    .get(adminController.getAdminPanel)

router.route('/roles')
    //.get(authentication.verifyJWT(ROLES.admin) ,adminController.getRolePanel)
    .get(adminController.getRolePanel)

router.route('/roles/all')
    //.get(authentication.verifyJWT(ROLES.admin) ,adminController.getAllRoles)
    .get(adminController.getAllRoles)

module.exports = router;