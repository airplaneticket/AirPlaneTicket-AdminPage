const mongoose = require('mongoose');

let maxMiddleAirportSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true,
        default: 'PDAirline'
    }
});

let maxMiddleAirportModel = mongoose.model('maxMiddleAirportModel', maxMiddleAirportSchema, 'MaxMiddleAirport');

module.exports = maxMiddleAirportModel;