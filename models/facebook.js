const mongoose = require('mongoose')

var schema = mongoose.Schema({ 
    token: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("facebook", schema, "facebook");