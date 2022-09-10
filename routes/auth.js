const express = require('express');
const AuthController = require('../controllers/AuthController');


const router = express.Router();


router.route('/basic')
    .post(AuthController.basicLogin)

router.route('OAuth')
    .post(AuthController.oAuthLogin)
