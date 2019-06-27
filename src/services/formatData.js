const moment = require('moment');
const _ = require('lodash');

module.exports.formatDataForFlight = async(inputdata) => {

    //format for seat
    let numberOfSeats = [];
    let priceOfSeats = [];
    let seatTypes = [];
    for (let i = 0; i < inputdata.numberOfSeats.length; i++) {
        if (!_.isEmpty(inputdata.numberOfSeats[i])) {
            numberOfSeats.push(parseInt(inputdata.numberOfSeats[i]));
            priceOfSeats.push(parseInt(inputdata.priceOfSeats[i]));
            seatTypes.push(inputdata.numberOfSeatTypes[i]);
        }
    }
    inputdata.numberOfSeats = numberOfSeats;
    inputdata.numberOfSeatTypes = seatTypes;
    inputdata.priceOfSeats = priceOfSeats;
    inputdata.totalSeat = numberOfSeats.reduce((a, b) => {
        return a + b;
    }, 0);

    //format for flightMiddleAirport
    let flightMiddleAirport = [];
    let flightMiddleAirportTime = [];
    for (let i = 0; i < inputdata.flightMiddleAirport.length; i++) {
        if (inputdata.flightMiddleAirport[i] !== 'Chọn sân bay trung gian') {
            flightMiddleAirport.push(inputdata.flightMiddleAirport[i]);
            flightMiddleAirportTime.push(inputdata.flightMiddleAirportTime[i]);
        }
    }
    inputdata.flightMiddleAirport = flightMiddleAirport;
    inputdata.flightMiddleAirportTime = flightMiddleAirportTime;

    //formart for number of seat
    inputdata.numberOfSeats.map(num => parseInt(num));
    inputdata.seatTypeBoughts = [];
    for (i = 0; i < inputdata.numberOfSeatTypes.length; i++) {
        let temp = {
            seatType: inputdata.numberOfSeatTypes[i],
            quantity: 0
        }
        inputdata.seatTypeBoughts.push(temp);
    }

    //formart for flightDate
    let flightDate = inputdata.flightDate.split('-').map(num => parseInt(num));
    inputdata.flightDate = new Object();
    inputdata.flightDate.year = flightDate[0];
    inputdata.flightDate.month = flightDate[1];
    inputdata.flightDate.day = flightDate[2];
}