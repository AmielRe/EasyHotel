const mongoose = require('mongoose')

var schema = mongoose.Schema({ 
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Chat", schema, "Chat");