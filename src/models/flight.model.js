const mongoose = require('mongoose');

let flightSchema = new mongoose.Schema({
    flightId: {
        type: String,
        required: true
    },
    flightName: {
        type: String,
        required: true
    },
    flightFrom: {
        type: String,
        required: true
    },
    flightDestination: {
        type: String,
        required: true
    },
    flightDepartTime: {
        type: String,
        required: true
    },
    flightDate: {
        type: Object,
        required: true
    },
    flightTime: {
        type: String,
        required: true
    },
    flightMiddleAirport: {
        type: Object,
        default: []
    },
    flightMiddleAirportTime: {
        type: Object,
        default: []
    },
    numberOfSeatTypes: {
        type: Object,
        default: [],
        required: true
    },
    numberOfSeats: {
        type: Object,
        default: [],
        required: true
    },
    priceOfSeats: {
        type: Object,
        default: [],
        required: true
    },
    totalSeat: {
        type: Number,
        required: true
    },
    boughtSeat: {
        type: Number,
        default: 0
    },
    income: {
        type: Number,
        default: 0
    }
});

let flightModel = mongoose.model('flightModel', flightSchema, 'Flights');

module.exports = flightModel;