const mongoose = require('mongoose')

var schema = mongoose.Schema({ 
    fullName: {
        type: String,
        required: true
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
    role: {
        type: Number,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("User", schema, "User");