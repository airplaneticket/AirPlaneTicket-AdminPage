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
    for (let i = 0; i < newFlight.seatTypeBoughts.length; i++) {
        if (newFlight.seatTypeBoughts[i].seatType === ticket.seatType) {
            newFlight.seatTypeBoughts[i].quantity += 1;
        }
    }
    newFlight.boughtSeat += 1;
    newFlight.income += ticket.price;
    _.assign(flight, newFlight);
    await flight.save();
}

let ticketModel = mongoose.model("ticketModel", ticketSchema, "Tickets");
module.exports = ticketModel;