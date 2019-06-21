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
        type: String,
        required: true
    },
    flightTime: {
        type: String,
        required: true
    },
    flightMiddleAirPort: {
        type: Object,
        default: []
    },
    flightMiddleAirPortTime: {
        type: Object,
        default: []
    },
    seatTypes: {
        type: Object,
        default: [],
        required: true
    },
    numberOfSeat: {
        type: Object,
        default: [],
        required: true
    },
    totalSeat: {
        type: Number,
        required: true
    },
    priceOfSeats: {
        type: Object,
        default: [],
        required: true
    }
});

let flightModel = mongoose.model('flightModel', flightSchema, 'Flights');

module.exports = flightModel;