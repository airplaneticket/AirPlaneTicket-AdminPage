const mongoose = require('mongoose');

let airportSchema = new mongoose.Schema({
    airportCode: {
        type: String,
        required: true
    },
    airportName: {
        type: String,
        required: true
    },
    locationCode: {
        type: String,
        required: true
    },
    locationName: {
        type: String,
        required: true
    },
});


let airportModel = mongoose.model('airportModel', airportSchema, 'Airports');

module.exports = airportModel;