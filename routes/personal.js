const express = require('express');
const personalController = require('../controllers/personalController');

const router = express.Router();

router.route('/')
    .get(personalController.personalSpace)

router.route('/chats')
    .get(personalController.getChatsPanel)

module.exports = router;