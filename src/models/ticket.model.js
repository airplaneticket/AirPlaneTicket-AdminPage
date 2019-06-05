const mongoose = require('mongoose');

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

let ticketModel = mongoose.model("ticketModel", ticketSchema, "Tickets");