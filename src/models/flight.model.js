const mongoose = require('mongoose');

let flightSchema = new mongoose.Schema({
    flightId: {
        type: String,
        required: true
    },
    airlineInfor: {
        type: Object,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    destination: {
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
    middleAirPort: {
        type: Object,
        default: []
    },
    timeAtMiddleAirPort: {
        type: Object,
        default: []
    },
    numberOfSeatTypes: {
        type: Object,
        default: [],
        required: true
    },
    numberOfSeat: {
        type: Object,
        default: [],
        required: true
    },
    priceOfSeatType: {
        type: Object,
        default: [],
        required: true
    }
});

let flightModel = mongoose.model('flightModel', flightSchema, 'Flights');

module.exports = flightModel;