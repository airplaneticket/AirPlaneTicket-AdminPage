const mongoose = require('mongoose');

let seatTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

let seatTypeModel = mongoose.model('seatTypeModel', seatTypeSchema, 'SeatTypes');

module.exports = seatTypeModel;