const mongoose = require('mongoose')

var schema = mongoose.Schema({ 
    name: {
        type: String,
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

module.exports = mongoose.model("Service", schema, "Service");