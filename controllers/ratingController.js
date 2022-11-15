const Rating = require('../models/rating');
const Response = require('../config/response');
const { connect } = require('mongoose');


const getRatingsScores = async (req, res) => {

    try {
        const ratings = await Rating.find();
        res.status(200).json(ratings);
    }

    catch ( err ) {
        res.status(500).json({"error" : Response.status[500] });
    }

}

const getRatingsComments = async (req, res) => {
    const score = req.params.score;

    try {
        comments = await Rating.find({"score" : score}, 'comment');
        res.status(200).json(comments);
    }
    catch ( err ) {
        res.status(500).json({"error" : Response.status[500] });
    }
    

}


const addNewRating = async (req, res) => {
    const rating = new Rating({
        score: req.body.score,
        comment: req.body.comment
    });

    try {
        await rating.save();
        res.status(200).json(Response.status[200]);

    }

    catch ( err ) {
        
        res.status(500).json({"error" : Response.status[500] });
    }
}


module.exports = {
    getRatingsScores,
    getRatingsComments,
    addNewRating
}

