const express = require('express');
const router = express.Router();

const reportController = require('../../controller/report.controller');

router.get('/month', reportController.getMonthReport);

router.get('/year', reportController.getYearReport);

router.post('/month', reportController.postMonthReport);


module.exports = router;