const reportService = require('../../services/report');


module.exports.getMonthReport = (req, res) => {
    res.render('adminpage/report/month-report.ejs', {
        report: []
    });
}

module.exports.getYearReport = (req, res) => {
    res.render('adminpage/report/year-report.ejs', {
        report: []
    })
}

module.exports.postMonthReport = async(req, res) => {
    try {
        let selectedMonth = req.body.selectedMonth;
        report = await reportService.monthReport(selectedMonth);
        res.render('adminpage/report/month-report.ejs', {
            selectedMonth,
            report
        });
    } catch (err) {
        res.status(500);
        res.send("Lỗi server hãy tải lại trang");
        console.log(err);
    }
}

module.exports.postYearReport = async(req, res) => {
    try {
        let selectedYear = req.body.selectedYear;
        let report = await reportService.yearReport(selectedYear);
        res.render('adminpage/report/year-report.ejs', {
            report,
            selectedYear
        });
    } catch (err) {
        res.status(500);
        res.send("Lỗi server hãy tải lại trang");
        console.log(err);
    }
}