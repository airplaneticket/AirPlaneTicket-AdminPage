const mongoose = require('mongoose');
const _ = require('lodash');

const flightModel = require('../models/flight.model');

let ticketSchema = new mongoose.Schema({
    flightId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    seatType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

ticketSchema.methods.saveForReport = async(ticket) => {
    let flight = await flightModel.findOne({ flightId: ticket.flightId });
    let newFlight = flight.toObject();
    newFlight.boughtSeat += 1;
    newFlight.income += ticket.price;
    _.assign(flight, newFlight);
    await flight.save();
}

let ticketModel = mongoose.model("ticketModel", ticketSchema, "Tickets");
module.exports = ticketModel;