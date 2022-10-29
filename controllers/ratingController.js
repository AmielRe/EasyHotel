const Rating = require('../models/rating');
const Response = require('../config/response');


const getRatingsScores = async (req, res) => {

    try {
        const ratings = await Rating.find();
        res.status(200).json(ratings);
    }

    catch ( err ) {
        res.status(500).json(Response.status[500]);
    }

}

const getRatingsComments = (req, res) => {
    const score = req.params.score;

    Rating.find({"score" : score}, 'comment', function(comments, err) {
        if ( err ) {
            res.status(500).json(Response.status[500]);
        }
        res.status(200).json(comments);
    });

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
        console.log(err);
        res.status(500).json(Response.status[500]);
    }
}


module.exports = {
    getRatingsScores,
    getRatingsComments,
    addNewRating
}

