const express = require('express');
const personalController = require('../controllers/personalController');

const router = express.Router();

router.route('/')
    .get(personalController.personalSpace)

module.exports = router;