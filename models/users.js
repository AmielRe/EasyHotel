const mongoose = require('mongoose')

var schema = mongoose.Schema({

    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        default: 0
    }

}, {
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("User", schema, "User");