const express = require('express');
const servicesController = require('../controllers/servicesController');
const { ROLES } = require('../config/roles');
const authentication = require('../middleware/verifyJWT')

const router = express.Router();


router.route('/')
    .get(servicesController.getAllServices)
    .post(authentication.verifyJWT(ROLES.admin) ,servicesController.addNewService)
    .put(authentication.verifyJWT(ROLES.admin) ,servicesController.UpdateService)


router.route('/:id')
    .delete(authentication.verifyJWT(ROLES.admin) ,servicesController.deleteService)

module.exports = router;