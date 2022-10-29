const express = require('express');
const ratingController = require('../controllers/ratingController');

const router = express.Router();

router.route('/')
    .get(ratingController.getRatingsScores)
    .post(ratingController.addNewRating)

router.route('/:score')
    .get(ratingController.getRatingsComments)

module.exports = router;