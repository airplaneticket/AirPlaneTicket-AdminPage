const express = require('express');
const router = express.Router();

router.get('/month', (req, res) => {
    res.render('adminpage/report/month-report.ejs');
})

router.get('/year', (req, res) => {
    res.render('adminpage/report/year-report.ejs');
})

module.exports = router;