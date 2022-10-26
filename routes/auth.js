const express = require('express');
const AuthController = require('../controllers/AuthController');
const { route } = require('./orders');


const router = express.Router();


router.route('/basic')
    .post(AuthController.basicLogin)

router.route('OAuth')
    .post(AuthController.oAuthLogin)

router.route('/access_token')
    .get(AuthController.getFacebookAccessToken)


module.exports = router;
