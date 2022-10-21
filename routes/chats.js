const express = require('express');

const chatsController = require('../controllers/chatController');

const router = express.Router();

router.route('/')
    .get(chatsController.getAllUserMessages)

module.exports = router;