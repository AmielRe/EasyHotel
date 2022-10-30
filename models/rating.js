const mongoose = require('mongoose')

var schema = mongoose.Schema({ 
    score: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Rating", schema, "Rating");