const express = require('express');
const ratingController = require('../controllers/ratingController');
const authentication = require('../middleware/verifyJWT');
const { ROLES } = require('../config/roles');

const router = express.Router();

router.route('/')
    .get(authentication.verifyJWT([ROLES.admin]), ratingController.getRatingsScores)
    .post(ratingController.addNewRating)

router.route('/:score')
    .get(authentication.verifyJWT([ROLES.admin]), ratingController.getRatingsComments)

module.exports = router;