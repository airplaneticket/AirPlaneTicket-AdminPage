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