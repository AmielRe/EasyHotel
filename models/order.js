const mongoose = require('mongoose')
const Room = require('./room').schema;

var schema = mongoose.Schema({ 
    totalCost: {
        type: Number,
        required: true
    },
    rooms: [{
        type: Room,
        default: {}
    }]
}, {
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Order", schema, "Order");