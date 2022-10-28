const express = require('express');
const AuthController = require('../controllers/AuthController');
const { route } = require('./orders');

const router = express.Router();

router.route('/basic')
    .post(AuthController.login)

router.route('/access_token')
    .get(AuthController.getFacebookAccessToken)

router.route('/logout')
    .get(AuthController.logout)

module.exports = router;
