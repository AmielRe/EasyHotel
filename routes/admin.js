const express = require('express');
const { request } = require('http');
const { ROLES } = require('../config/roles');
const adminController = require('../controllers/adminController');
const authentication = require('../middlewere/verifyJWT')

const router = express.Router();

router.route('/')
    .get(authentication.verifyJWT(ROLES.admin) ,adminController.getAdminPanel)

module.exports = router;