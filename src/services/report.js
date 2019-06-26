const flightModel = require('../models/flight.model');

module.exports.monthReport = async(selectedMonth) => {
    try {
        let flights = await flightModel.find({ 'flightDate.month': parseInt(selectedMonth) });
        let report = [];
        let totalIncome = 0;
        for (flight of flights) {
            totalIncome += flight.income;
        }
        for (let i = 0; i < flights.length; i++) {
            let flight = flights[i].toObject();
            let ratio = flight.income / totalIncome;
            ratio = ratio.toFixed(2) * 100;
            let saveFlight = {
                flightName: flight.flightName,
                boughtSeat: flight.boughtSeat,
                income: flight.income,
                serial: i + 1,
                ratio: ratio,
                totalSeat: flight.totalSeat
            };
            report.push(saveFlight);
        }
        return report;
    } catch (err) {
        return err;
    }
}

module.exports.yearReport = async(selectedYear) => {
    try {
        let flights = await flightModel.find({ 'flightDate.year': parseInt(selectedYear) });
        let report = [];
        let totalIncome = 0;
        let ratio = 0;
        for (flight of flights) {
            totalIncome += flight.income;
        }
        for (let i = 1; i <= 12; i++) {
            let numberOfFlight = 0;
            let monthIncome = 0;
            for (flight of flights) {
                if (flight.flightDate.month === i) {
                    numberOfFlight += 1;
                    monthIncome += flight.income;
                }
            }
            if (totalIncome != 0) {
                ratio = monthIncome / totalIncome;
                ratio = ratio.toFixed(2) * 100;
            }
            let saveFlight = {
                month: i,
                numberOfFlight,
                monthIncome,
                ratio
            }
            report.push(saveFlight);
        }
        return report;
    } catch (err) {
        console.log(err);
        return err;
    }
}