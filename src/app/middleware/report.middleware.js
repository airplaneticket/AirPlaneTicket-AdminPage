const _ = require('lodash');
const flightModel = require('../../models/flight.model');

module.exports.postDownloadMonthReport = async(req, res, next) => {
    try {
        let downloadReportMonth = req.body.downloadReportMonth;
        let flights = await flightModel.find({ 'flightDate.month': parseInt(downloadReportMonth) });
        if (downloadReportMonth === '') {
            req.flash('error', 'Chưa có thống kê hiển thị để xuất báo cáo');
            res.redirect('/report/month');
            return;
        } else if (flights.length <= 0) {
            req.flash('error', 'Không có dữ liệu để xuất báo cáo');
            res.redirect('/report/month');
            next();
        }
    } catch (err) {
        res.status(500);
        res.send("Lỗi server hãy tải lại trang");
        console.log(err);
    }
}

module.exports.postDownloadYear = async(req, res, next) => {
    try {
        let downloadReportYear = req.body.downloadReportYear;
        let flights = await flightModel.find({ 'flightDate.year': parseInt(downloadReportYear) });
        if (flights.length <= 0) {
            req.flash('error', 'Không có dữ liệu trong thống kê để xuất báo cáo');
            res.redirect('/report/year');
            return;
        } else {
            next();
        }
    } catch (err) {
        res.status(500);
        res.send("Lỗi server hãy tải lại trang");
        console.log(err);
    }

}