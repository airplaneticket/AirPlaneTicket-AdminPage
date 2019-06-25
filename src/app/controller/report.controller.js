const path = require('path');
const { Parser } = require('json2csv');
const fs = require('fs');
const moment = require('moment');
const flightModel = require('../../models/flight.model');


module.exports.getMonthReport = (req, res) => {
    res.render('adminpage/report/month-report.ejs');
}

module.exports.getYearReport = (req, res) => {
    res.render('adminpage/report/year-report.ejs')
}

module.exports.postMonthReport = async(req, res) => {
    try {

    } catch (err) {
        res.status(500);
        res.send("Lỗi server hãy tải lại trang");
    }
}

module.exports.saveYearReport = async(req, res) => {
    try {
        let fields = ['Chuyến bay', 'Số vé', 'Doanh thu', 'Tỷ lệ'];
        let flights = await flightModel.find({}).select('flightName flightDate.year numberOfSeats priceOfSeats');

        let json2csvParser = new Parser({ fields });
        let csv = json2csvParser.parse(flights);
        let datetime = moment().format('ssmmhhDDMMYYYY');
        let file = path.join(__dirname, '..', '..', 'public', 'report', 'year', "year-report-" + datetime + ".csv");
        fs.writeFileSync(file, csv)
        res.download(file);
    } catch (err) {
        res.send(err);
    }
}