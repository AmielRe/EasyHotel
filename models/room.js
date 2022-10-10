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
    }
}, {
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Room", schema, "Room");