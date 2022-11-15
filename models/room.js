const mongoose = require('mongoose')

var schema = mongoose.Schema({ 
    roomType: {
        type: String,
        enum : ['Suite','Exclusive', 'Family', 'Standard'],
        default: 'Standard',
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    reserved: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Room", schema, "Room");