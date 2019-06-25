const express = require('express');
const path = require('path');
const objectToCSV = require('objects-to-csv');
const fs = require('fs');
const moment = require('moment');

const reportController = require('../../controller/report.controller');
const reportMiddleware = require('../../middleware/report.middleware');
const reportService = require('../../../services/report');

const router = express.Router();


router.get('/month', reportController.getMonthReport);

router.get('/year', reportController.getYearReport);

router.post('/month', reportController.postMonthReport);


router.post('/month/download', reportMiddleware.postDownloadMonthReport, async(req, res) => {
    let downloadReportMonth = req.body.downloadReportMonth;
    let report = [];
    let flights = await reportService.monthReport(downloadReportMonth);
    for (flight of flights) {
        let item = {
            STT: flight.serial,
            ChuyenBay: flight.flightName,
            SoVeBanRa: flight.boughtSeat,
            TongSoGhe: flight.totalSeat,
            DoanhThu: flight.income,
            TyLe: flight.ratio
        };
        report.push(item);
    }
    let test = await new objectToCSV(report).toString();
    let datetime = moment().format('ssmmhhDDMMYYYY');
    let file = path.join(__dirname, '..', '..', 'public', 'report', 'month', "month-" + downloadReportMonth + "-report-" + datetime + ".csv");
    fs.writeFileSync(file, test)
    res.download(file);
});



module.exports = router;